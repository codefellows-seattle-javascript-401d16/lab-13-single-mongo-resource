'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockBikeShop = require('./lib/mock-bike-shop.js');

let tempShop;
const API_URL = process.env.API_URL;

describe('testing api/bikeShops', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);
});
