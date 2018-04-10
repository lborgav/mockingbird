#!/usr/bin/env node

const program = require('commander');
const server = require('./server');

program
  .version('0.1.0')
  .usage('<file>')
  .parse(process.argv);

if (!program.args.length) {
  program.help();
} else {
  const file = program.args[0];
  const json = require('./' + file);
  server.init(json);
}
