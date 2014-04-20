'use strict';

var m = mori;

function generateAverages() {
    var arr = m.repeatedly(50, m.partial(_.random, 0, 100));
    var sum = m.reduce(function (sum, num) {
        return sum + num;
    }, arr);
    return sum / m.count(arr);
}

var avgArr = m.repeatedly(15, generateAverages);

function binSize(num) {
  return Math.round(num / 5) * 5;
}

var grouped_data = m.group_by(binSize, avgArr);

function data_map(key) {
  return {"x": key,
          "y": m.into_array(m.get(grouped_data, key)).length};
}

var data = m.into_array(m.map(data_map, m.keys(grouped_data)));

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
