var Hapi = require('hapi'),
    routes = require('./routes'),
    dictionary = require('./server_scripts/dictionary');

var PORT = process.env.PORT || 8899;

var serverOptions = {
  debug: { request: ['error'] },
  cors: true
};

var server = new Hapi.Server('localhost', PORT, serverOptions);

server.route(routes);

function init() {
  dictionary.init();
  console.log("Server running at: " + server.info.uri);
}

server.start(init());
