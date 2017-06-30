'use strict';

const faker = require('faker');
const dotenv = require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockTrail = require('./lib/mock-trail.js');
const mockResort = require('./lib/mock-resort.js');

const API_URL = process.env.API_URL;
let tempResort;
let tempTrail;

describe('Testing /API/TRAILS routes', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB.trail);
  afterEach(clearDB.resort);

  describe('Testing POST /api/trails route', () => {
    describe('if successful', () => {
      it('it should return a new trail with resort reference', () => {
        return mockResort.createOne()
        .then(resort => {
          tempResort = resort;
          console.log('tempResortTrail: ', tempResort);

          return superagent.post(`${API_URL}/api/trails`)
          .send({name: 'big air trail'});
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('big air trail');
          expect(res.body._id).toExist();
          expect(res.body.resort).toEqual(tempResort._id);
        });
      });
    });
    describe('if passing in bad content', () => {
      it('it should return a 400 status', () => {
        return mockResort.createOne()
        .then(resort => {
          tempResort = resort;
          console.log('tempResort: ', tempResort);
          return superagent.post(`${API_URL}/api/trails`)
          .send({});
        })
        .catch(res => expect(res.status).toEqual(400));
      });
    });
    describe('if passing in a non-unique property value', () => {
      it('it should return a 409 status', () => {
        return mockTrail.createOne()
        .then(data => {
          tempResort = data.resort;
          tempTrail = data.trail;
          console.log('tempResort: ', tempResort);
          console.log('tempTrail: ', tempTrail);
          return superagent.post(`${API_URL}/api/trails`)
          .send(tempTrail.name);
        })
        .catch(res => expect(res.status).toEqual(409));
      });
    });
  });

});
