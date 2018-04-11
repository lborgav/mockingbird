'use strict';

const expect = require('chai').expect;
const server = require('../server');

describe('Server should', () => {
  it('init and close', () => {
    server.init('tests/mock1.json');
    server.destroy();
  });
});
