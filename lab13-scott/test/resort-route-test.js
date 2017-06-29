'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const expect = require('expect');
const server = require('../server.js');
require('./lib/mock-resort.js');
const API_URL = process.env.API_URL;

describe('Testing for /api/resort routes', () => {
  before(server.start);
  after(server.stop);
  beforeEach(() => {
    //create new resort

  })
});
