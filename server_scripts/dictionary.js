var fs = require('fs'),
    R = require('ramda'),
    Trie = require('../scripts/trie');

exports.init = function() {
  fs.readFile('./resources/words.txt', {encoding: 'utf8', flag: 'r'},
      function(err, data) {
        if (err) throw err;
        var words = data.split('\r\n');
        Trie.multi_insert(words.map(function(elt) {
          return elt.toLowerCase();
        }));
      }
  );
};

exports.hasWord = function(word) {
  return Trie.hasWord(word);
};

exports.autocomplete = function(prefix, size) {
  return Trie.autocomplete(prefix, size);
};
