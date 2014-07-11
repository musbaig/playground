'use strict';

var rootApp = angular.module('playground', ['ngRoute', 'playgroundControllers', 'playgroundDirectives']);

rootApp.config(['$routeProvider',
  function Router($routeProvider) {
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
