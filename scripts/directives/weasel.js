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
          var padding = {"bottom": 60, "left": 60, "top": 10},
              svgWidth = 510,
              svgHeight = 270;
          // Dynamic, random data set
          var scatterData = [];
          // Create scale functions
          var xScale = d3.scale.linear()
              .domain([1, d3.max(scatterData, function(d) { return d.x; })])
              .range([5 + padding.left, 400 + padding.left]);
          var yScale = d3.scale.linear()
              .domain([0, d3.max(scatterData, function(d) { return d.y; })])
              .range([200 + padding.top, padding.top])
              .clamp(true);
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
          var svgContainer = d3.select(element[0])
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
              .text('Sample');
          // Add Y axis
          var yAxisGroup = svgContainer.append('g')
              .attr('class', 'y axis')
              .attr('transform', 'translate(' + padding.left + ', ' + (padding.top - 10) + ")")
              .call(yAxis);
          // Label Y axis
          svgContainer.append('text')
              .attr('transform', 'rotate(-90)')
              .style('class', 'text')
              .attr('y', padding.left / 2)
              .attr('x', 0 - ((svgHeight + padding.top) / 2))
              .style('text-anchor', 'middle')
              .text('Fitness (%)');
          // click event trigger
          scope.$watch("data",
              function(value) {
                scatterData = value;
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
                    .duration(75)
                    .ease('linear')
                    .attr('cx', function(d) { return xScale(d.x); })
                    .attr('cy', function(d) { return yScale(d.y); })
                    .attr('r', 2)
                    .attr('fill', 'blue')
                    .attr('opacity', 1.0);
                xAxis.scale(xScale);
                yAxis.scale(yScale);
                xAxisGroup
                    .transition()
                    .duration(75)
                    .ease("linear")
                    .attr('class', 'x axis')
                    .call(xAxis);
                yAxisGroup
                    .transition()
                    .duration(75)
                    .ease("linear")
                    .attr('class', 'y axis')
                    .call(yAxis);
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
