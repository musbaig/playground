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

playgroundControllers.controller('GeneticAlgorithm', [
  '$scope',
  '$interval',
  'GeneticAlgorithm',
  function geneticAlgorithmController($scope, $interval, GeneticAlgorithm) {

    $scope.playing = false;

    var samples = [],
        playing;

    $scope.playGA = function() {
      if (angular.isDefined(playing)) return;

      $scope.playing = true;

      GeneticAlgorithm.play($scope.target, $scope.mutation);
//      if (target && mutation_prob) {
//        $scope.target = $scope.mutation_prob = "";
//      }

      playing = $interval(function() {
        if (samples.length > 0) {
          $scope.sample = samples.shift();
        } else {
          $interval.cancel(playing);
          playing = undefined;
        }
      }, 100);
    };

    $scope.resetParams = function() {
      $scope.target = $scope.mutation = $scope.sample = "";
      $scope.playing = false;
    };

    $scope.$on('SamplingEvent', function(event, args) {
      samples.push(args);
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
