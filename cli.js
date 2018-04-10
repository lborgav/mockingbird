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
  try {
    const json = require('./' + file);
    server.init(json);
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      console.error(
        'It seems that your input file is invalid. It should be a valid JSON file',
      );
      console.error(err);
    }
  }
}
