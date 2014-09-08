'use strict';

var playgroundServices = angular.module('playgroundServices', []);

playgroundServices.value('navBarValues', [
  {view: "genetics", title: "Dawkins' Weasel (SVG)", active: true},
  {view: "clt", title: "Central Limit Theorem", active: true},
  {view: "d3", title: "D3 Playground", active: true},
  {view: "trie", title: "Trie Playground", active: true}
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
        // Load client in the browser
        $rootScope.$apply(function() {
          d.resolve(window.d3);
        });
      }
      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
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
