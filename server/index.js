const http = require('http');
const url = require('url');

let ports;
let routes = {};

function initListeners(json) {
  console.log('Firing up Mockingbird server');
  ports = Object.keys(json);

  ports.forEach(function(value) {
    routes = Object.assign(routes, json[value]);
  });

  ports.map(function(port) {
    http.createServer(handler).listen(port);
  });
  console.log('Listening on the following ports:', ports.join(', '));
  console.log();
}

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
}

function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  const method = req.method;
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;

  const mockString = method + ' ' + pathname;
  console.log(mockString);
  if (routes[mockString]) {
    res.write(JSON.stringify(routes[mockString]));
  } else res.write('Error');
  res.end();
}

module.exports = {
  init: function(file) {
    initListeners(file);
  },
};
