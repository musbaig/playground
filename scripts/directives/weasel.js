'use strict';

angular.module('playgroundDirectives')
    .directive('weasel', ['d3Service',
  function(d3Service) {
    return {
      restrict: 'E',
      replace: 'true',
      scope: { data: '=' },
      link: function(scope, element, attrs) {

        d3Service.d3().then(function(d3) {

          // SVG setup
          var padding = {"bottom": 60, "left": 60, "top": 30, "right": 30},
              width = 500,
              height = 300,
              max_X = 400,
              max_Y = 200,
              axisGap = 5;
          // Data set
          var scatterData = [];
          // Create scale functions
          var xScale = d3.scale.linear()
              .domain([1, 2])
              .range([padding.left, max_X + padding.left]);
          var yScale = d3.scale.linear()
              .domain([0, 100])
              .range([max_Y + padding.top, padding.top]);
          // Define X axis
          var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient('bottom')
              .ticks(7);
          // Define Y axis
          var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient('left')
              .ticks(5);
          // Create svg element/container
          var svg = d3.select(element[0])
              .append('svg')
              .attr('width', width)
              .attr('height', height);
//              .style('border', '1px solid gray');
          // Create clip-path
          svg.append("clipPath")
              .attr("id", "chart-area")
              .append("rect")
              .attr("x", padding.left)
              .attr("y", padding.top)
              .attr("width", max_X + padding.right) // for staging entering data points
              .attr("height", max_Y);
          // Create scatter plot circle points
//          svg.selectAll('circle')
//              .data(scatterData)
//              .enter()
//              .append('circle')
//              .attr('cx', function(d) { return xScale(d.x); })
//              .attr('cy', function(d) { return yScale(d.y); })
//              .attr('r', 2)
//              .attr('fill', 'blue');
          // Add X axis
          var xAxisGroup = svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(' + 0 + ', ' + (max_Y + padding.top + axisGap) + ")")
              .call(xAxis);
          // Label X axis
          svg.append('text')
              .attr('class', 'text')
              .attr('transform', 'translate(' + ((max_X / 2) + padding.left) + ', ' + (max_Y + padding.bottom + 10) + ')')
              .style('text-anchor', 'middle')
              .text('Generations (x10)');
          // Add Y axis
          var yAxisGroup = svg.append('g')
              .attr('class', 'y axis')
              .attr('transform', 'translate(' + (padding.left - axisGap) + ', ' + 0 + ")")
              .call(yAxis);
          // Label Y axis
          svg.append('text')
              .attr('transform', 'rotate(-90)')
              .attr('class', 'text')
              .attr('y', (padding.left / 2) - 5)
              .attr('x', 0 - (padding.top + (max_Y / 2)))
              .style('text-anchor', 'middle')
              .text('Fitness (%)');
          // click event trigger
          scope.$watch("data",
              function(value) {
                scatterData = value;

                if(scatterData.length === 0) {
                  svg.selectAll('circle').remove();
                } else {
                  var circles = svg.selectAll('circle')
                      .data(scatterData);

                  circles.enter()
                      .append('circle')
                      .attr('cx', function(d) { return xScale(d.x); })
                      .attr('cy', function(d) { return yScale(d.y); })
                      .attr('r', 4)
                      .attr('fill', 'gray')
                      .attr('opacity', 0.1);
                  xScale.domain([1, d3.max(scatterData, function(d) { return d.x; })]);
//                yScale.domain([0, d3.max(scatterData, function(d) { return d.y; })]);
                  circles.transition()
                      .duration(75)
                      .delay(150)
                      .ease('linear')
                      .attr('cx', function(d) { return xScale(d.x); })
                      .attr('cy', function(d) { return yScale(d.y); })
                      .attr('r', 2)
                      .attr('fill', 'blue')
                      .attr('opacity', 1.0);
                  xAxis.scale(xScale);
//                yAxis.scale(yScale);
                  xAxisGroup
                      .transition()
                      .duration(75)
                      .ease("linear")
                      .attr('class', 'x axis')
                      .call(xAxis);
//                yAxisGroup
//                    .transition()
//                    .duration(75)
//                    .ease("linear")
//                    .attr('class', 'y axis')
//                    .call(yAxis);
                }
              }, true);

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
