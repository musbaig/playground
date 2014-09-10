var dictionary = require('./server_scripts/dictionary');

module.exports = [
  {
    method: 'GET',
    path: '/playground/{path*}',
    handler: {
      directory: {
        path: './',
        listing: false,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/playground/index.html',
    handler: {
      file: 'index.html'
    }
  },
  {
    method:  'GET',
    path:    '/playground/trie/{prefix}',
    handler: function(req, res) {
      res(dictionary.autocomplete(encodeURIComponent(req.params.prefix),
          parseInt(req.query.size)));
    }
  }
//{
//  method: 'GET',
//  path: '/playground/views/{path*}',
//  handler: {
//    directory: {
//      path: './views',
//      listing: false,
//      index: false
//    }
//  }
//},

];
