function evolution($rootScope, target, mutation_prob) {

  var TARGET = target ? target.toUpperCase() : "METHINKS IT IS LIKE A WEASEL",
      ALPHABET = "ABCDEFGHIJKLMONPQRSTUVWXYZ ",
      MUT_PROB = mutation_prob ? parseInt(mutation_prob) : 10,
      FITTEST = [],
      R = ramda;

  var generateGenome = function() {
//    var genome = [];
//    for (var i = 0; i < TARGET.length; ++i) {
//      genome[i] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
//    }
//    return genome.join("");
    var genome = R.repeatN(ALPHABET[Math.floor(Math.random() * ALPHABET.length)], TARGET.length);
    return genome.join("");
  };

  var getFitness = function(genome) {
//    var fitness = 0;
//    for (var i = 0; i < TARGET.length; ++i) {
//      if (genome[i] === TARGET[i]) {
//        fitness++;
//      }
//    }
//    return fitness;
    var fitness = R.reduce.idx(function(accu, elem, idx) {
      return elem === genome[idx] ? accu + 1 : accu;
    }, 0, TARGET);
    return fitness
  };

  var getGenePool = function(genome) {
//    var pool = [];
//    for (var i = 0; i < 50; ++i) {
//      pool[i] = genome;
//    }
//    return pool;
    return R.repeatN(genome, 50);
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
    while (getFitness(fittest) !== TARGET.length) {
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
