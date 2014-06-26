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

  var target = "",
      mutation_prob = 0;

  $scope.playGA = function() {
    target = this.target;
    mutation_prob = this.mutation_prob;
    if(target && mutation_prob) {
      $scope.target = $scope.mutation_prob = "";
    }
    alert(target);
  };

  $scope.resetParams = function() {
    $scope.target = $scope.mutation_prob = "";
  };
}]);

playgroundControllers.controller('CLT', ['$scope', function($scope) {
  $scope.greet = "That's central limit theorem";
}]);

playgroundControllers.controller('D3', ['$scope', function($scope) {
  $scope.greet = "Data driven documents";
}]);
