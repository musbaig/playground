'use strict';

function generateTrie(words) {
  var trie = {};
  words.forEach(function(word) {
    var letters = word.split(""),
        current = trie;
    for(var j = 0; j < letters.length; j++) {
      var letter = letters[j], position = current[letter];
      if(position == null) {
        current = current[letter] = j === letters.length - 1 ? {$: 1} : {};
      } else if(position === 1) {
        current = current[letter] = {$: 1};
      } else {
        current = current[letter];
      }
    }
  });
  return trie;
}
