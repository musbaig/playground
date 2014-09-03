'use strict';

var playgroundControllers = angular.module('playgroundControllers', ['playgroundServices']);

playgroundControllers.controller('GeneticAlgorithm', [
  '$scope',
  '$interval',
  'GeneticAlgorithm',
  function geneticAlgorithmController($scope, $interval, GeneticAlgorithm) {

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

      GeneticAlgorithm.play($scope.target, $scope.mutation);

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
    $.ajax({
      url: "views/rxjs.html",
      type: 'GET',
      dataType: 'html',
      cache: false
    }).done(function(html) {
      console.log('done');
    });
  }
]);

playgroundControllers.controller('RxJS', ['$scope',
  function rxjsController($scope) {
    $scope.greet = "Reactive Programming WTF!";

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

    var R = ramda;
    var evens = [2,2,4,4,5];
    var data = [1,2,3,4,5];
    $scope.ramdar = R.reduce.idx(function(acc, y, idx) {
      return y === evens[idx] ? acc + 1 : acc;
    }, 0, data);
  }
]);
