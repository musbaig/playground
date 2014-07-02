'use strict';

var playgroundControllers = angular.module('playgroundControllers', ["playgroundServices"]);

playgroundControllers.controller('Navigation', ['$scope', '$location', 'navBarItems',
  function navController($scope, $location, navBarItems) {
    $scope.navBarItems = navBarItems;
    $scope.navClass = function(view) {
      var currentRoute = $location.path().substring(1) || 'genetics';
      return view === currentRoute ? 'active' : '';
    };
  }
]);

playgroundControllers.controller('GeneticAlgorithm', ['$scope', 'GeneticAlgorithm',
  function geneticAlgorithmController($scope, GeneticAlgorithm) {
    $scope.greet = "Genes baby!!";
    $scope.sample = [];

    var target = "",
        mutation_prob = 0;

    $scope.playGA = function() {
      target = this.target;
      mutation_prob = this.mutation_prob;
      if (target && mutation_prob) {
        GeneticAlgorithm.play(target, mutation_prob);
//        $scope.target = $scope.mutation_prob = "";
      }
    };

    $scope.resetParams = function() {
      $scope.target = $scope.mutation_prob = "";
    };

    $scope.$on('SamplingEvent', function(event, args) {
      $scope.sample.push(args);
//      alert(args);
    });
  }
]);

playgroundControllers.controller('CLT', ['$scope',
  function cltController($scope) {
    $scope.greet = "That's central limit theorem";
  }
]);

playgroundControllers.controller('D3', ['$scope',
  function d3Controller($scope) {
    $scope.greet = "Data driven documents";
  }
]);

playgroundControllers.controller('RxJS', ['$scope',
  function rxjsController($scope) {
    $scope.greet = "Reactive Programming WTF!";

    var asimov = Rx.Observable.fromArray([
        "Prelude to Foundation",
        "Foundation",
        "Second Foundation",
        "Foundation and Empire",
        "Foundations Edge",
        "Foundation and Earth"
    ]);

    $scope.asimov = asimov.toArray();
  }
]);
