'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../server.js');
const MockResort = require('./lib/mock-resort.js');
const clearDB = require('./lib/clear-db.js');
const API_URL = process.env.API_URL;

describe('Testing for /api/resort routes', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('Testing POST routes', () => {
    describe('If successful', () => {
      it('it should create a new resort and respond with 200', () => {
        return superagent.post(`${API_URL}/api/resorts`)
        .send(MockResort.createOne)
        .then(res => {
          console.log('res.body: ', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.name).toExist();
          expect(res.body._id).toExist();
        });
      });
    });
  });




});
