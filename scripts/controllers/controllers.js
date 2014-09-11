'use strict';

var playgroundControllers = angular.module('playgroundControllers', ['playgroundServices']);

playgroundControllers.controller('GeneticAlgorithm', [
  '$scope',
  '$interval',
  'GeneticAlgorithmService',
  function geneticAlgorithmController($scope, $interval, GeneticAlgorithmService) {

    $scope.playing = false;
    $scope.samples = [];
//    $scope.animationSpeed = 75;

//    $scope.$watch('animationSpeed', function(newValue) {
//      $scope.animationSpeed = newValue;
//    });

    var sample_queue = [],
        playing;

    $scope.playGA = function() {
      if (angular.isDefined(playing)) return;

      $scope.samples = [];
      $scope.playing = true;
      $scope.complete = "";

      GeneticAlgorithmService.play($scope.target, $scope.mutation);

      playing = $interval(function() {
        if (sample_queue.length > 0) {
          var sample = sample_queue.shift();
          $scope.samples.push({"x": (sample.numGens) / 10,
                               "y": sample.hamming});
          $scope.sample = sample.fittest;
        } else {
          $scope.complete = "Success!";
          $scope.stopGA();
        }
      }, $scope.animationSpeed);
    };

    $scope.stopGA = function() {
      if (angular.isDefined(playing)) {
        $interval.cancel(playing);
        playing = undefined;
      }
    };

    $scope.resetGA = function() {
      $scope.stopGA();
      $scope.target = $scope.mutation = $scope.sample = $scope.complete = "";
      $scope.samples = [];
      $scope.playing = false;
    };

    $scope.$on('SamplingEvent', function(event, args) {
      sample_queue.push(args);
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

playgroundControllers.controller('Trie', ['$scope', 'DictionaryService',
  function trieController($scope, DictionaryService) {
    $scope.greet = "Trie WTF!";

//    var asimov = Rx.Observable.fromArray([
//      "Prelude to Foundation",
//      "Foundation",
//      "Second Foundation",
//      "Foundation and Empire",
//      "Foundations Edge",
//      "Foundation and Earth"
//    ]);
//
//    $scope.asimov = asimov.toArray();

    $scope.$watch('keyword', function(newValue, oldValue) {

      if(newValue === oldValue || newValue === "") {
        $scope.results = "";
      } else {
        var results = DictionaryService.query({prefix: newValue}, function() {
          if(results.length != 0) {
            $scope.results = results;
          } else {
            // TODO add word undefined hint for user
            $scope.results = "";
          }
        });
      }
    });
  }
]);
