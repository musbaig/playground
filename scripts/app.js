'use strict';

var app = angular.module('playground', ['ngRoute', 'playgroundControllers']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
        when('/genetics', {
          templateUrl: 'views/genetic_algorithm.html',
          controller: 'GeneticAlgorithmCtrl'
        }).
        when('/clt', {
          templateUrl: 'views/clt.html',
          controller: 'CLT'
        }).
        when('/d3', {
          templateUrl: 'views/d3.html',
          controller: 'D3'
        }).
        otherwise({
          redirectTo: '/genetics'
        });
  }]);
