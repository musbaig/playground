'use strict';

var rootApp = angular.module('playground', ['ngRoute', 'playgroundControllers']);

rootApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/genetics', {
          templateUrl: 'views/genetic_algorithm.html',
          controller: 'GeneticAlgorithm'
        }).
        when('/clt', {
          templateUrl: 'views/clt.html',
          controller: 'CLT'
        }).
        when('/d3', {
          templateUrl: 'views/d3.html',
          controller: 'D3'
        }).
        when('/rxjs', {
          templateUrl: 'views/rxjs.html',
          controller: 'RxJS'
        }).
        otherwise({
          redirectTo: '/genetics'
        });
  }]);
