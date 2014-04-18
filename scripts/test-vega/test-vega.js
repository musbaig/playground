'use strict';

var m = mori();

var generateAverages = function () {
    var arr = _.times(50, _.partial(_.random, 0, 100));
    var sum = _.reduce(arr, function (sum, num) {
        return sum + num;
    });
    return sum / _.size(arr);
};

var avgArr = _.times(15, generateAverages);

var data_map = _.groupBy(avgArr, function (num) {
    return Math.round(num / 5) * 5;
});

var data = _.map(_.keys(data_map), function (key) {
    return {"x": key,
            "y": data_map[key].length};
});

var genSpec = function() {
    var spec =
    {
        "width": 400,
        "height": 200,
        "padding": {"top": 10, "left": 45, "bottom": 30, "right": 10},
        "data": [
            {
                "name": "table",
                "values": data
            }
        ],
        "scales": [
            {
                "name": "x",
                "type": "ordinal",
                "range": "width",
                "domain": {"data": "table", "field": "data.x"}
            },
            {
                "name": "y",
                "range": "height",
                "nice": true,
                "domain": {"data": "table", "field": "data.y"}
            }
        ],
        "axes": [
            {"type": "x", "scale": "x"},
            {"type": "y", "scale": "y", "offset": 5}
        ],
        "marks": [
            {
                "type": "rect",
                "from": {"data": "table"},
                "properties": {
                    "enter": {
                        "x": {"scale": "x", "field": "data.x"},
                        "width": {"scale": "x", "band": true, "offset": -1},
                        "y": {"scale": "y", "field": "data.y"},
                        "y2": {"scale": "y", "value": 0}
                    },
                    "update": {
                        "fill": {"value": "steelblue"}
                    },
                    "hover": {
                        "fill": {"value": "red"}
                    }
                }
            }
        ]
    };
    return spec;
}
