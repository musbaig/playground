var Path = require('path');
var Hapi = require('hapi');

var PORT = process.env.PORT || 8000;

var serverOptions = {
  debug: { request: ['error'] },
  cors: true
};

var server = new Hapi.Server('localhost', PORT, serverOptions);

//server.route({
//  method: 'GET',
//  path: '/playground/views/{path*}',
//  handler: {
//    directory: {
//      path: './views',
//      listing: false,
//      index: false
//    }
//  }
//});

server.route({
  method: 'GET',
  path: '/playground/{path*}',
  handler: {
    directory: {
      path: './',
      listing: false,
      index: false
    }
  }
});

server.route({
  method: 'GET',
  path: '/playground/index.html',
  handler: {
    file: 'index.html'
  }
});

server.start(function() {
  console.log("Server running at: " + server.info.uri);
});
