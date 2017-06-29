'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const mockResort = require('./lib/mock-resort.js');
const clearDB = require('./lib/clear-db.js');
const API_URL = process.env.API_URL;
const faker = require('faker');

describe('Testing for /api/resort routes', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('Testing POST routes', () => {
    describe('If successful', () => {
      it('it should create a new resort and respond with 200', () => {
        return superagent.post(`${API_URL}/api/resorts`)
        .send({name: `${faker.hacker.verb()} pass resort`})
        .then(res => {
          console.log('res.body: ', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.name).toExist();
          expect(res.body._id).toExist();
        });
      });
    });
    describe('If passing in bad content', () => {
      it('it should respond with 400 status', () => {
        return superagent.post(`${API_URL}/api/resorts`)
        .send('bad content')
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
    describe('If passing in a bad pathname', () => {
      it('it should respond with 404 status', () => {
        return superagent.post(`${API_URL}/api/notapath`)
        .send({name: `${faker.hacker.verb()} pass resort`})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
  });

  describe('Testing GET routes at /api/lists/:id', () => {
    describe('If successful', () => {
      it('it should create a new resort and respond with 200', () => {
        let tempResort;
        return mockResort.createOne()
        .then(resort => {
          tempResort = resort;
          return superagent.get(`${API_URL}/api/resorts/${tempResort._id}`);
        })
        .then(res => {
          console.log('res.body: ', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.name).toExist(tempResort.name);
          expect(res.body.trails).toEqual([]);
          expect(res.body._id).toEqual(tempResort._id);
        });
      });
    });
    describe('If passing in a bad pathname', () => {
      it('it should respond with 404 status', () => {
        return superagent.get(`${API_URL}/api/notapath`)
        .send({name: `${faker.hacker.verb()} pass resort`})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
  });




});
