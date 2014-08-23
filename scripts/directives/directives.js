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
      controller:  ['$scope', '$location' , 'navBarValues',
        function($scope, $location, navBarValues) {
          $scope.navBarItems = navBarValues;
          $scope.navClass = function(view) {
            var currentRoute = $location.path().substring(1) || navBarValues[0].view;
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
      restrict: 'E',
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

          // SVG setup
          var padding = {'bottom': 60, 'left': 60, 'top': 10},
              svgWidth = 510,
              svgHeight = 270,
              numDataPoints = 10,
              yRange = randomInt(100);
          // Dynamic, random data set
          var scatterData = R.times(function(n) {
            return {"x": n + 1 ,
                    "y": Math.round(Math.random() * yRange)};
          }, numDataPoints);
          // Create scale functions
          var xScale = d3.scale.linear()
                               .domain([1, d3.max(scatterData, function(d) { return d.x; })])
                               .range([5 + padding.left, 400 + padding.left]);
          var yScale = d3.scale.linear()
                               .domain([0, d3.max(scatterData, function(d) { return d.y; })])
                               .range([200 + padding.top, padding.top])
                               .clamp(true);
//          var lineFunction = d3.svg.line()
//                                   .x(function(d) { return xScale(d.x); })
//                                   .y(function(d) { return yScale(d.y); })
//                                   .interpolate('linear');
          // Define X axis
          var xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom')
                            .ticks(5);
          // Define Y axis
          var yAxis = d3.svg.axis()
                            .scale(yScale)
                            .orient('left')
                            .ticks(5);
          // Create svg element/container
          svgContainer = d3.select(element[0])
                           .append('div')
                           .append('svg')
                           .attr('id', 'exp')
                           .attr('width', svgWidth)
                           .attr('height', svgHeight)
                           .style('border', '1px solid gray');
          // Create clip-path
          svgContainer.append("clipPath")
                      .attr("id", "chart-area")
                      .append("rect")
                      .attr("x", padding.left)
                      .attr("y", padding.top)
                      .attr("width", 430)
                      .attr("height", 200);
          // Create scatter plot circle points
          svgContainer.selectAll('circle')
                                    .data(scatterData)
                                    .enter()
                                    .append('circle')
                                    .attr('cx', function(d) { return xScale(d.x); })
                                    .attr('cy', function(d) { return yScale(d.y); })
                                    .attr('r', 2)
                                    .attr('fill', 'blue');
          // Add X axis
          var xAxisGroup = svgContainer.append('g')
                                       .attr('class', 'x axis')
                                       .attr('transform', 'translate(' + 0 + ', ' + (svgHeight - (padding.bottom - 5)) + ")")
                                       .call(xAxis);
          // Label X axis
          svgContainer.append('text')
                      .attr('transform', 'translate(' + (svgWidth / 2) + ', ' + (svgHeight - 20) + ')')
                      .attr('class', 'text')
                      .style('text-anchor', 'middle')
                      .text('Data Points');
          // Add Y axis
          var yAxisGroup = svgContainer.append('g')
                                       .attr('class', 'y axis')
                                       .attr('transform', 'translate(' + padding.left + ', ' + (padding.top - 10) + ")")
                                       .call(yAxis);
          // Label Y axis
          svgContainer.append('text')
              .attr('transform', 'rotate(-90)')
              .attr('class', 'text')
              .style('text-anchor', 'middle')
              .attr('y', padding.left / 2)
              .attr('x', 0 - ((svgHeight / 2) - 25))
              .style('text-anchor', 'middle')
              .text('Value');
//          var lineGraph = svgContainer.append('g')
//                                      .attr('transform', 'translate(' + padding.left + ', ' + padding.top +')')
//                                      .attr("clip-path", "url(#chart-area")
//                                      .append('path')
//                                      .attr('class', 'line')
//                                      .attr('d', lineFunction(lineData));
          // click event trigger
          d3.select("svg#exp")
              .on("click",
//          $interval(
              function() {
                var incrBy = 1;
                numDataPoints += incrBy;
                yRange = randomInt(100);
//                console.log("numDataPoints: " + numDataPoints);
                scatterData = R.concat(scatterData,
                    R.times(function(n) {
                      return {"x": n + numDataPoints,
                              "y": Math.round(Math.random() * yRange)};
                    }, incrBy));
//                lineGraph
//                    .attr("d", lineFunction(scatterData))
//                    .attr("class", "line");
                var circles = svgContainer.selectAll('circle')
                                          .data(scatterData);

                circles.enter()
                       .append('circle')
                       .attr('cx', function(d) { return xScale(d.x); })
                       .attr('cy', function(d) { return yScale(d.y); })
                       .attr('r', 4)
                       .attr('fill', 'gray')
                       .attr('opacity', 0.1);
                xScale.domain([1, d3.max(scatterData, function(d) { return d.x; })]);
                yScale.domain([0, d3.max(scatterData, function(d) { return d.y; })]);
                circles.transition()
                       .duration(250)
                       .ease('linear')
                       .attr('cx', function(d) { return xScale(d.x); })
                       .attr('cy', function(d) { return yScale(d.y); })
                       .attr('r', 2)
                       .attr('fill', 'blue')
                       .attr('opacity', 1.0);
//                lineGraph
//                    .transition()
//                    .duration(250)
//                    .ease("linear")
//                    .attr('d', lineFunction(scatterData))
//                    .attr('class', 'line');
////                    .each("start", function() {
////                      d3.select(this)
////                        .attr('stroke', 'magenta')
////                        .attr('stroke-width', 5)
////                        .attr('fill', 'none');
////                    })
////                    .each("end", function() {
////                      d3.select(this)
////                        .transition()
////                        .duration(500)
////                        .attr('stroke', 'blue')
////                        .attr('stroke-width', 1)
////                        .attr('fill', 'none');
////                    });
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

          var logScale = d3.scale.log()
              .domain([1, 10000])
              .range([0, 10]);

          $("svg:last").after("<div>" + [1, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000]
              .map(function(n) {
                return Math.round(logScale(n) * 100) / 100;
              }).toString() + "</div>");

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
