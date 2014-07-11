'use strict';

var playgroundControllers = angular.module('playgroundControllers', ['playgroundServices']);

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

      playing = $interval(function() {
        if (samples.length > 0) {
          $scope.sample = samples.shift();
        } else {
          $scope.stopGA();
        }
      }, 100);
    };

    $scope.stopGA = function() {
      if (angular.isDefined(playing)) {
        $interval.cancel(playing);
        playing = undefined;
      }
    };

    $scope.resetGA = function() {
      $scope.stopGA();
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
    $.ajax({
      url: "views/rxjs.html",
      type: 'GET',
      dataType: 'html',
      cache: false
    })
        .done(function(html) {
          alert('done');
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
