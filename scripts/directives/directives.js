'use strict';

var R = ramda;

var playgroundDirectives = angular.module('playgroundDirectives', ['playgroundServices']);

var randomInt = function(max) {
  return Math.floor((Math.random() * max) + 1);
};

playgroundDirectives.directive('navSidebar', [
  function() {
    return {
      scope:       {},
      restrict:    'E',
      replace:     'true',
      controller:  ['$scope', '$location' , 'navBarItems',
        function($scope, $location, navBarItems) {
          $scope.navBarItems = navBarItems;
          $scope.navClass = function(view) {
            var currentRoute = $location.path().substring(1) || navBarItems[0].view;
            return view === currentRoute ? 'active' : '';
          };
        }],
      templateUrl: 'views/nav_sidebar.html'
    }
  }
]);

function decorateSelection(selection, attr_map, style_map) {
  if(selection) {
    R.reduce(function(accum, key) {
      return accum.attr(key, attr_map[key]);
    }, selection, R.keys(attr_map));
    R.reduce(function(accum, key) {
      return accum.style(key, style_map[key]);
    }, selection, R.keys(style_map));
  }
  return selection;
}

playgroundDirectives.directive('sparkLine', ['d3Service', '$interval',
  function(d3Service, $interval) {
    return {
      restrict: 'EA',
      link: function(scope, element, attrs) {

        d3Service.d3().then(function(d3) {

          var jsonRectangles = [
            { "x": 10, "y": 10, "height": 20, "width": 20, "color": "green" },
            { "x": 160, "y": 40, "height": 20, "width": 20, "color": "purple" },
            { "x": 70, "y": 70, "height": 20, "width": 20, "color": "red" }
          ];
          var max_x = d3.max(jsonRectangles, function(d) {
            return d.x + d.width;
          }) + 20;
          var max_y = d3.max(jsonRectangles, function(d) {
            return d.y + d.height;
          }) + 20;
          var svgContainer = d3.select(element[0])
                               .append('div')
                               .append('svg')
                               .attr('width', max_x)
                               .attr('height', max_y)
                               .style('border', '1px solid gray');
//          svgContainer = decorateSelection(svgContainer,
//              {'width': max_x,
//               'height': max_y},
//              {'border': '1px solid gray'});
          var rectangles = svgContainer.selectAll('rect')
                                       .data(jsonRectangles)
                                       .enter()
                                       .append('rect');
          rectangles
              .attr('x', function(d) {
                return d.x;
              })
              .attr('y', function(d) {
                return d.y;
              })
              .attr('height', function(d) {
                return d.height;
              })
              .attr('width', function(d) {
                return d.width;
              })
              .style('fill', function(d) {
                return d.color;
              });

          var padding = 30,
              w = 450,
              h = 240,
              numDataPoints = 10,
              yRange = randomInt(100);
          var lineData = R.times(function(n) {
            return {"x": n,
                    "y": Math.round(Math.random() * yRange)};
          }, numDataPoints);
          var xScale = d3.scale.linear()
                         .domain([0, d3.max(lineData, function(d) { return d.x; })])
                         .range([0, 400]);
          var yScale = d3.scale.linear()
                         .domain([0, d3.max(lineData, function(d) { return d.y; })])
                         .range([200, 0])
                         .clamp(true);
          var lineFunction = d3.svg.line()
                                   .x(function(d) { return xScale(d.x); })
                                   .y(function(d) { return yScale(d.y); })
                                   .interpolate('linear');
          var xAxis = d3.svg.axis()
                        .scale(xScale)
                        .orient('bottom')
                        .ticks(5);
          var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient('left')
                        .ticks(5);
          svgContainer = d3.select(element[0])
                           .append('div')
                           .append('svg')
                           .attr('id', 'exp')
                           .attr('width', w)
                           .attr('height', h)
                           .style('border', '1px solid gray');
          svgContainer.append("clipPath")
                      .attr("id", "chart-area")
                      .append("rect")
                      .attr("x", padding)
                      .attr("y", 10)
                      .attr("width", 400)
                      .attr("height", 200);
          var xAxisGroup = svgContainer.append('g')
                                       .attr('class', 'x axis')
                                       .attr('transform', 'translate(' + padding + ', ' + (h - (padding - 5)) + ")")
                                       .call(xAxis);
          var yAxisGroup = svgContainer.append('g')
                                       .attr('class', 'y axis')
                                       .attr('transform', 'translate(' + padding + ', ' + 10 + ")")
                                       .call(yAxis);
          var lineGraph = svgContainer.append('g')
                                      .attr('transform', 'translate(' + padding + ', ' + 10 +')')
                                      .attr("clip-path", "url(#chart-area")
                                      .append('path')
                                      .attr('d', lineFunction(lineData))
                                      .attr('stroke', 'blue')
                                      .attr('stroke-width', 2)
                                      .attr('fill', 'none');
          // click event trigger
          d3.select("svg#exp")
              .on("click",
//          $interval(
              function() {
                var incrBy = 5;
                numDataPoints += incrBy;
                yRange = randomInt(100);
                console.log("numDataPoints: " + numDataPoints);
                lineData = R.concat(lineData,
                    R.times(function(n) {
                      return {"x": n + numDataPoints,
                              "y": Math.round(Math.random() * yRange)};
                    }, incrBy));
                xScale.domain([0, d3.max(lineData, function(d) { return d.x; })]);
                yScale.domain([0, d3.max(lineData, function(d) { return d.y; })]);
                lineGraph
                    .transition()
                    .duration(250)
                    .ease("linear")
                    .attr('d', lineFunction(lineData))
                    .attr('stroke', 'blue')
                    .attr('stroke-width', 1)
                    .attr('fill', 'none');
//                    .each("start", function() {
//                      d3.select(this)
//                        .attr('stroke', 'magenta')
//                        .attr('stroke-width', 5)
//                        .attr('fill', 'none');
//                    })
//                    .each("end", function() {
//                      d3.select(this)
//                        .transition()
//                        .duration(500)
//                        .attr('stroke', 'blue')
//                        .attr('stroke-width', 1)
//                        .attr('fill', 'none');
//                    });
                xAxis.scale(xScale);
                yAxis.scale(yScale);
                xAxisGroup
                    .transition()
                    .duration(250)
                    .ease("linear")
                    .attr('class', 'x axis')
                    .call(xAxis);
                yAxisGroup
                    .transition()
                    .duration(250)
                    .ease("linear")
                    .attr('class', 'y axis')
                    .call(yAxis);
              });

//          var logScale = d3.scale.log()
//              .domain([1, 10000])
//              .range([0, 10]);
//
//          $("svg:last").after("<div>" + [1, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000]
//              .map(function(n) {
//                return Math.round(logScale(n) * 100) / 100;
//              }).toString() + "</div>");

//          var circleData = [
//            { "cx": 20, "cy": 20, "radius": 20, "color": "green" },
//            { "cx": 70, "cy": 70, "radius": 20, "color": "purple" }
//          ];
//          svgContainer = d3.select(element[0])
//              .append('div')
//              .append('svg')
//              .attr('width', 200)
//              .attr('height', 200)
//              .style('border', '1px solid gray');
//          var circles = svgContainer.selectAll('circle')
//              .data(circleData)
//              .enter()
//              .append('circle');
//          var circleAttrs = circles
//              .attr("cx", function (d) { return d.cx; })
//              .attr("cy", function (d) { return d.cy; })
//              .attr("r", function (d) { return d.radius; })
//              .style("fill", function (d) { return d.color; });
//          var text = svgContainer.selectAll('text')
//              .data(circleData)
//              .enter()
//              .append('text');
//          var textAttrs = text
//              .attr('x', function(d) { return d.cx; })
//              .attr('y', function(d) { return d.cy; })
//              .text(function(d) { return "HELLO!"; })
//              .attr('font-family', 'sans-serif')
//              .attr('text-anchor', 'middle')
//              .attr('font-size', '20px')
//              .attr('fill', 'red');

//          var jsonCircles = [
//            {
//              "x": 30,
//              "y_axis": 30,
//              "radius": 15,
//              "color":  "green"
//            },
//            {
//              "x_axis": 270,
//              "y_axis": 70,
//              "radius": 25,
//              "color":  "purple"
//            },
//            {
//              "x_axis": 110,
//              "y_axis": 110,
//              "radius": 20,
//              "color":  "red"
//            }
//          ];
//          var svgContainer = d3.select(element[0])
//                  .append('svg')
//                  .attr('width', max_x)
//                  .attr('height', max_y),
//              circle = svgContainer
//                  .selectAll('circle')
//                  .data(jsonCircles)
//                  .enter()
//                  .append('circle'),
//              circleAttr = circle
//                  .attr('cx', function(d) { return d.x_axis; })
//                  .attr('cy', function(d) { return d.y_axis; })
//                  .attr('r', function(d) { return d.radius; })
//                  .style('fill', function(d) { return d.color; });

//          var circleRadii = [40, 20 , 10],
//              svgContainer =
//                  d3.select(element[0])
//                      .append('svg')
//                      .attr('width', 200)
//                      .attr('height', 200),
//              circles = svgContainer
//                  .selectAll('circle')
//                  .data(circleRadii)
//                  .enter()
//                  .append('circle'),
//              circleAttr = circles
//                  .attr('cx', 50)
//                  .attr('cy', 50)
//                  .attr('r', function(d) {
//                    return d;
//                  })
//                  .style('fill', function(d) {
//                    switch(d) {
//                      case 40:
//                        return 'green';
//                      case 20:
//                        return 'purple';
//                      case 10:
//                        return 'red';
//                    }
//                  });

          $(window).resize(function() {
            scope.$apply();
          });

          scope.$watch(function() {
            return $(window).width();
          }, function() {
            console.log("Window resized to: " + $(window).width());
          });
        });
      }
    }
  }
]);

playgroundDirectives.directive('barChart', ['d3Service',
  function(d3Service) {
    return {
      restrict: 'E',
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {

          var R = ramda;

          var data = R.times(function(n) {
            return Math.round(Math.random() * 100);
          }, 50);
        });
      }
    }
  }
]);
