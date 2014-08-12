'use strict';

var playgroundServices = angular.module('playgroundServices', []);

playgroundServices.value('navBarItems', [
  {view: "genetics", title: "Dawkins' Weasel Expr", active: true},
  {view: "clt", title: "Central Limit Theorem", active: true},
  {view: "d3", title: "D3 Playground", active: true},
  {view: "rxjs", title: "RxJS Playground", active: true}
]);

playgroundServices.service('GeneticAlgorithm', ['$rootScope', '$interval',
  function GeneticAlgorithmService($rootScope, $interval) {
    this.play = function(target, mutation_prob) {
      evolution($rootScope, target, mutation_prob);
    };
  }
]);

playgroundServices.factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        $rootScope.$apply(function() {
          d.resolve(window.d3);
        });
      }
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = "bower_components/d3/d3.min.js";//'http://d3js.org/d3.v3.min.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState == 'complete') onScriptLoad();
      };
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
        d3: function() {
          return d.promise;
        }
      };
    }
]);

playgroundServices.service('RandomIntsGenerator', [
  function() {
    this.generateNRandomInts = function(N, n) {

    };
  }
]);
