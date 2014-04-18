'use strict';

angular.module('genomics', [])
    .config(function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/genomics/genetic_algorithm', {
                templateUrl: '/genomics/views/genetic_algorithm.html',
                controller: 'BasicGeneticAlgo'
            })
            .otherwise({
                redirectTo: '/genomics/genetic_algorithm'
            })
    });