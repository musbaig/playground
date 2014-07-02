function evolution($rootScope, target, mut_prob) {

//  var TARGET = target.toUpperCase() || "METHINKS IT IS LIKE A WEASEL";
  var TARGET = "METHINKS IT IS LIKE A WEASEL";
  var ALPHABET = "ABCDEFGHIJKLMONPQRSTUVWXYZ ";
//  var MUT_PROB = mut_prob ? parseInt(mut_prob) : 10;
  var MUT_PROB = 10;
  var FITTEST = [];

  var generateGenome = function() {
    var genome = [];
    for (var i = 0; i < 28; ++i) {
      genome[i] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
    }
    return genome.join("");
  };

  var getFitness = function(genome) {
    var fitness = 0;
    for (var i = 0; i < TARGET.length; ++i) {
      if (genome[i] === TARGET[i]) {
        fitness++;
      }
    }
    return fitness;
  };

  var getGenePool = function(genome) {
    var pool = [];
    for (var i = 0; i < 50; ++i) {
      pool[i] = genome;
    }
    return pool;
  };

  var getFittest = function(pool) {
    var fittestLoc = 0;
    var fittest = 0;
    for (var i = 0; i < pool.length; ++i) {
      if (getFitness(pool[i]) > fittest) {
        fittest = getFitness(pool[i]);
        fittestLoc = i;
      }
    }
    return pool[fittest];
  };

  var doMutation = function(genome) {
    var newGenome = "";
    for (var i = 0; i < genome.length; i++) {
      if (Math.floor(Math.random() * MUT_PROB) === 1) {
        if (genome[i] !== TARGET[i]) {
          newGenome += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        } else {
          newGenome += genome[i];
        }
      } else {
        newGenome += genome[i]
      }
    }
    return newGenome;
  };

  var evolve = function() {
    var numGens = 0;
    var fittest = generateGenome();
    while (getFitness(fittest) !== 28) {
      numGens++;
      var pool = getGenePool(fittest);
      var pool2 = [];
      for (var i = 0; i < pool.length; ++i) {
        pool2[i] = doMutation(pool[i]);
      }
      fittest = getFittest(pool2);
      FITTEST.push(fittest);
      if (numGens % 10 === 0) {
          $rootScope.$broadcast('SamplingEvent', fittest);
//        console.log(fittest);
      }
    }
    $rootScope.$broadcast('SamplingEvent', fittest);
//    console.log("numGens = " + numGens);
//    return {"fittest": fittest,
//      "numGens": numGens};
  };

  evolve();
}
