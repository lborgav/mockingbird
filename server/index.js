'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');

let ports;
let routes = {};
let httpServers = [];

function loadFile(file) {
  const fileText = fs.readFileSync('./' + file, 'utf8');
  return JSON.parse(fileText);
}

function initListeners(file) {
  console.log('Firing up Mockingbird server');
  let json = loadFile(file);
  ports = Object.keys(json);

  ports.forEach(function(value) {
    routes = Object.assign(routes, json[value]);
  });

  httpServers = ports.map(function(port) {
    return http.createServer(handler).listen(port);
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

function destroy() {
  try {
    httpServers.forEach(function(s) {
      s.close();
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  init: function(file) {
    initListeners(file);
  },
  destroy: destroy,
};
