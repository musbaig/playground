'use strict';

var mori = mori;

function generateAverages() {
    var arr = mori.repeatedly(50, mori.partial(_.random, 0, 100));
    var sum = mori.reduce(function (sum, num) {
        return sum + num;
    }, arr);
    return sum / mori.count(arr);
}

var avgArr = mori.repeatedly(75, generateAverages);

function binSize(num) {
  return Math.round(num / 2) * 2;
}

var grouped_data = mori.group_by(binSize, avgArr);

function data_map(key) {
  return {"x": key,
          "y": mori.into_array(mori.get(grouped_data, key)).length};
}

var data = mori.into_array(mori.map(data_map, mori.keys(grouped_data)));

var genSpec = function() {
    var spec =
    {
        "width": 450,
        "height": 250,
        "padding": {"top": 10, "left": 45, "bottom": 45, "right": 10},
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
            {"type": "x",
             "scale": "x",
             "title": "Average"},
            {"type": "y",
             "scale": "y",
             "title": "Frequency",
             "offset": 5}
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
};
