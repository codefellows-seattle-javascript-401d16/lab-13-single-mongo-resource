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

  describe('\nTesting POST /api/trails route\n', () => {
    describe('if successful', () => {
      it('it should return a new trail with resort reference and 200', () => {
        return mockResort.createOne()
        .then(resort => {
          tempResort = resort;
          console.log('tempResort: ', tempResort);
          console.log('tempTrial: ', tempTrail);

          return superagent.post(`${API_URL}/api/trails`)
          .send({name: 'big air trail', resort: tempResort._id});
        })
        .then(res => {
          console.log('res body', res.body);
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
          .send({name: tempTrail.name, resort: tempResort._id});
        })
        .catch(res => expect(res.status).toEqual(409));
      });
    });
  });

  describe('\nTesting GET /api/trails route\n', () => {
    describe('if successful', () => {
      it('it should return an existing trail at specifed id and 200 status', () => {
        return mockTrail.createOne()
        .then(data => {
          tempResort = data.resort;
          tempTrail = data.trail;
          console.log('tempResort: ', tempResort);
          console.log('tempTrail: ', tempTrail);
          return superagent.get(`${API_URL}/api/trails/${tempTrail._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toExist();
          expect(res.body._id).toEqual(tempTrail._id);
          expect(res.body.resort).toEqual(tempResort._id);
        });
      });
    });
    describe('if successful', () => {
      it('it should create 20, return 10, map 20 to resort.trail and 200', () => {
        return mockTrail.createMultiple(20)
        .then(data => {
          tempResort = data.resort;
          tempTrail = data.trail;
          console.log('tempResort: ', tempResort);
          console.log('tempTrail: ', tempTrail);
          return superagent.get(`${API_URL}/api/trails`);
        })
        .then(res => {
          console.log('res body', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.length).toEqual(10);
          res.body.forEach(trail => {
            expect(trail.name).toExist();
            expect(trail._id).toExist();
          });
        });
      });
    });
    describe('if passing in a bad pathname', () => {
      it('it should return a 404 status', () => {
        return mockTrail.createOne()
        .then(data => {
          tempResort = data.resort;
          tempTrail = data.trail;
          console.log('tempResort: ', tempResort);
          console.log('tempTrail: ', tempTrail);
          return superagent.get(`${API_URL}/api/trails/notanid`);
        })
        .catch(res => expect(res.status).toEqual(404));
      });
    });
  });

});
