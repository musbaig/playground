'use strict';

// yucky non-FP first attempt
//function generateTrie(words) {
//  var trie = {};
//  words.forEach(function(word) {
//    var letters = word.split(""),
//        current = trie;
//    for(var j = 0; j < letters.length; j++) {
//      var letter = letters[j], position = current[letter];
//      if(position == null) {
//        current = current[letter] = j === letters.length - 1 ? {$: 1} : {};
//      } else if(position === 1) {
//        current = current[letter] = {$: 1};
//      } else {
//        current = current[letter];
//      }
//    }
//  });
//  return trie;
//}

var Trie = function() {
  this.root = {};
};

module.exports = new Trie();

Trie.prototype.validate = function(word) {
  if((word === undefined) || (word === null)) {
    throw "Given word is invalid!"
  }
  if (typeof word != "string") {
    throw "Given word is not a string!";
  }
};

Trie.prototype.insert = function(word) {
  this.validate(word);

  var trie = this.root;
  trie = word.split("").reduce(function(currentTrie, letter) {
    if (!(letter in currentTrie)) {
      currentTrie[letter] = {};
    }
    return currentTrie[letter]; // return obj associated with that letter
  }, trie);

//  trie.$ = (trie.$ || 0) + 1; // TODO potentially counts num of inserts of same word
  trie.$ = 1;
};

Trie.prototype.multi_insert = function(words) {
  var T = this;
  words.map(function(word) {
    T.insert(word);
  }, T);
};

Trie.prototype.hasWord = function(word) {
  this.validate(word);

  var trie = this.root;
  word.split("").some(function(letter) {
    if (letter in trie) {
      trie = trie[letter];
      return false;
    } else {
      trie = {};
      return true;
    }
  });

//  return trie.$ > 0; // TODO address generic trie
  return trie.$ === 1;
};

Trie.prototype.autocomplete = function(prefix, size) {
  if (!prefix || prefix.length == 0) {
    return [];
  }
  var trie = this.root,
      prefix_arr = prefix.split("");

  for(var i = 0; i < prefix_arr.length; i++) {
    var letter = prefix_arr[i];
    if(letter in trie) {
      trie = trie[letter];
    } else {
      return [];
    }
  }

  function trieWords(curTrie, word, words, size) {
    for(var letter in curTrie) {
      if(words.length === size) break;
      if(letter == "$") {
        words.push(word);
      } else {
        trieWords(curTrie[letter], word + letter, words, size);
      }
    }

    return words;
  }

  var size = size || 10;
  var words = trieWords(trie, "", [], size);

  return words.map(function(elt) {
    return prefix + elt;
  })
};
