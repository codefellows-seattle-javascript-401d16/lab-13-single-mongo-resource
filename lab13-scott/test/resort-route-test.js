'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const mockResort = require('./lib/mock-resort.js');
const clearDB = require('./lib/clear-db.js');
const API_URL = process.env.API_URL;
const faker = require('faker');

let tempResort;

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
      it('it should respond with 200 and a specific resort', () => {
        return mockResort.createOne()
        .then(resort => {
          tempResort = resort;
          return superagent.get(`${API_URL}/api/resorts/${tempResort._id}`);
        })
        .then(res => {
          console.log('res.body: ', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempResort.name);
          expect(res.body.trails).toEqual([]);
          expect(res.body._id).toEqual(tempResort._id);
        });
      });
    });
    describe('If successful', () => {
      it('it should respond with 200 and array of 20 resorts', () => {
        return mockResort.createMultiple(20)
        .then(resorts => {
          tempResort = resorts;
          return superagent.get(`${API_URL}/api/resorts`);
        })
        .then(res => {
          // console.log('ARRAY OF RESORTS: ', res.body.map(resorts => resorts.name));
          expect(res.status).toEqual(200);
          expect(res.body.length).toEqual(15);
          res.body.forEach(resort => {
            expect(resort.name).toExist();
            expect(resort._id).toExist();
            expect(resort.trails).toEqual([]);
          });
        });
      });
    });
    describe('If passing in a bad pathname', () => {
      it('it should respond with 404 status', () => {
        return mockResort.createOne()
        .then(resort => {
          tempResort = resort;
          return superagent.get(`${API_URL}/api/notapath`)
        .send({name: `${faker.hacker.verb()} pass resort`});
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
  });

  describe('Testing PUT routes at /api/lists/:id', () => {
    describe('If successful', () => {
      it('it should update a resort and respond with the updated resort and 200', () => {
        let tempResort;
        return mockResort.createOne()
        .then(resort => {
          tempResort = resort;
          console.log('tempResort :', tempResort);
          return superagent.put(`${API_URL}/api/resorts/${tempResort._id}`)
          .send({name: 'Crystal Mountain'});
        })
        .then(res => {
          console.log('res.body: ', res.body);
          expect(res.status).toEqual(200);
          expect(res.body.name).toExist('Crystal Mountain');
          expect(res.body.trails).toEqual([]);
          expect(res.body._id).toEqual(tempResort._id);
        });
      });
    });
    describe('If passing in a bad pathname', () => {
      it('it should respond with 404 status', () => {
        let tempResort;
        return mockResort.createOne()
        .then(resort => {
          tempResort = resort;
          console.log('tempResort :', tempResort);
          return superagent.put(`${API_URL}/api/resorts/notapath`)
          .send({name: `${faker.hacker.verb()} pass resort`});
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
    describe('If passing in bad content', () => {
      it('it should respond with 400 status', () => {
        let tempResort;
        return mockResort.createOne()
        .then(resort => {
          tempResort = resort;
          console.log('tempResort :', tempResort);
          return superagent.put(`${API_URL}/api/resorts/${tempResort._id}`)
          .send('badcontent');
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
  });




});
