'use strict';

var playgroundControllers = angular.module('playgroundControllers', []);

playgroundControllers.controller('navCtrl', ['$scope', '$location', function($scope, $location) {
  $scope.navClass = function(view) {
    var currentRoute = $location.path().substring(1) || 'clt';
    return view === currentRoute ? 'active' : '';
  };
}]);

playgroundControllers.controller('GeneticAlgorithmCtrl', ['$scope', function($scope) {
  $scope.greet = "Genes baby!!";
}]);

playgroundControllers.controller('CLT', ['$scope', function($scope) {
  $scope.greet = "That's central limit theorem";
}]);

playgroundControllers.controller('D3', ['$scope', function($scope) {
  $scope.greet = "Data driven documents";
}]);
