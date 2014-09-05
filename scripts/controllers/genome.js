function evolution(scope, target, mutation_prob) {

  var TARGET = target ? target.toUpperCase() : "METHINKS IT IS LIKE A WEASEL",
      ALPHABET = "ABCDEFGHIJKLMONPQRSTUVWXYZ ",
      MUT_PROB = mutation_prob ? parseInt(mutation_prob) : 10,
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

  // Fitness (cost) function: uses Hamming distance
  var getFitness = function(genome) {
//    var fitness = 0;
//    for (var i = 0; i < TARGET.length; ++i) {
//      if (genome[i] === TARGET[i]) {
//        fitness++;
//      }
//    }
//    return fitness;
    return R.reduce.idx(function(accu, elem, idx) {
      return elem === genome[idx] ? accu + 1 : accu;
    }, 0, TARGET);
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
//    var fittestLoc = 0;
//    var fittest = 0;
//    for (var i = 0; i < pool.length; ++i) {
//      if (getFitness(pool[i]) > fittest) {
//        fittest = getFitness(pool[i]);
//        fittestLoc = i;
//      }
//    }
    var fittest = R.reduce(function(fittest, candidate) {
      var fitness = getFitness(candidate);
      return fitness > fittest ? fitness : fittest;
    }, 0, pool);
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
    var numGens = 0,
        tl = TARGET.length;
    var fittest = generateGenome();
    while (getFitness(fittest) !== tl) {
      numGens++;
      var pool = getGenePool(fittest);
//      var pool2 = [];
//      for (var i = 0; i < pool.length; ++i) {
//        pool2[i] = doMutation(pool[i]);
//      }
      var pool2 = R.reduce(function(pool2, elt) {
        pool2.push(doMutation(elt));
        return pool2;
      }, [], pool);
      fittest = getFittest(pool2);
      var sample = {"fittest": fittest,
                    "hamming": (getFitness(fittest) / tl) * 100,
                    "numGens": numGens};
      if (numGens % 10 === 0) { // TODO use random sampling
          scope.$broadcast('SamplingEvent', sample);
      }
    }
    scope.$broadcast('SamplingEvent', sample);
  };

  evolve();
}
