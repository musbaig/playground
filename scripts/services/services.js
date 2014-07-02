'use strict';

var playgroundServices = angular.module('playgroundServices', []);

playgroundServices.value('navBarItems', [
  {view: "genetics", title: "Basic Genetic Algorithm", active: true},
  {view: "clt", title: "Central Limit Theorem", active: true},
  {view: "d3", title: "D3 Playground", active: false},
  {view: "rxjs", title: "RxJS Playground", active: true}
]);

playgroundServices.service('GeneticAlgorithm', ['$rootScope', '$interval',
  function GeneticAlgorithmService($rootScope, $interval) {
    this.play = function(target, mutation_prob) {
      evolution($rootScope, target, mutation_prob);
//      $interval(function() {
//            $rootScope.$broadcast('SamplingEvent', {target: target, mutation_prob: mutation_prob});
//          },
//          5000, 2);
    };
  }
]);
