'use strict';

//test env
require('dotenv').config({path: './test/.env'});

//npm modules
const expect = require('expect');
const request = require('superagent');
const faker = require('faker');

//module imports
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockBeer = require('./lib/mock-beer.js');

//module constants
const API_URL = process.env.API_URL;
let tempBeer;

//tests

//start top-level describe block
describe('testing /api/beers', () => {
  //hooks
  before(server.start);
  after(server.stop);
  afterEach(clearDB);
  //end of hooks

  describe('testing POST /api/beers', () => {
    let data = {name: faker.lorem.word() + 'ale', type: faker.random.words(3)};
    it('should respond with a 200 status code and a beer object', () => {
      return request.post(`${API_URL}/api/beers`)
        .send(data)
        .then(res => {
          expect(res.status).toEqual(201);
          expect(res.body._id).toExist();
          expect(res.body.timeStamp).toExist();
          expect(res.body.name).toEqual(data.name);
          expect(res.body.type).toEqual(data.type);
          expect(res.body.grain).toEqual([]);
          tempBeer = res.body;
        });
    });
  });
//end of top-level describe block
});
