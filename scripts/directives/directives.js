'use strict';

var playgroundDirectives = angular.module('playgroundDirectives', []);

playgroundDirectives.directive('navSidebar', [function NavSidebarDirective() {
  return {
    scope: {},
    restrict: 'E',
    replace: 'true',
    controller: function(){
      console.log('Hello Directive');
    },
    template: '<h2>Hello Directive!</h2>'
  }
}]);
