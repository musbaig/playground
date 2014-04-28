'use strict';

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

Trie.prototype.validate = function(word) {
  if((word === undefined) || (word === null) || (typeof word != "string")) {
    throw "Word exception error!"
  }
};

Trie.prototype.insert = function(word) {
  var trie = this.root;
  trie = word.split("").reduce(function(curTrie, letter, indx, arr) {
    if(!(letter in curTrie)) {
      curTrie[letter] = {};
    }
    return curTrie[letter];
  }, trie);

  trie.$ = 1;
};

Trie.prototype.multi_insert = function(words) {
  words.map(function(word, indx, arr) {
    this.insert(word);
  }, this);
};

Trie.prototype.hasWord = function(word) {
};
