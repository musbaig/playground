'use strict';

var playgroundDirectives = angular.module('playgroundDirectives', ['playgroundServices']);

playgroundDirectives.directive('navSidebar', [function NavSidebarDirective() {
  return {
    scope: {},
    restrict: 'E',
    replace: 'true',
    controller: function($scope, $location, navBarItems){
      $scope.navBarItems = navBarItems;
      $scope.navClass = function(view) {
        var currentRoute = $location.path().substring(1) || 'genetics';
        return view === currentRoute ? 'active' : '';
      };
    },
    templateUrl: 'views/nav_sidebar.html'
  }
}]);
