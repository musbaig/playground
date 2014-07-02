'use strict';

var playgroundDirectives = angular.module('playgroundDirectives', []);

playgroundDirectives.directive('navSidebar', [function navSidebar() {
  return {
    restrict: 'E',
    scope: {},
    template: '<h2>Hello Directive!</h2>'
  }
}]);
