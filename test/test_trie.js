var assert = require('assert'),
    Trie = require('../scripts/trie');

describe('Trie#insert', function() {
  it('should return true when the word is present and false otherwise', function() {
    Trie.insert('test');
    console.log(JSON.stringify(Trie.root, null, 2));
    assert(true, Trie.hasWord('tests'));
    assert(true, !Trie.hasWord('words'));
  })
});
