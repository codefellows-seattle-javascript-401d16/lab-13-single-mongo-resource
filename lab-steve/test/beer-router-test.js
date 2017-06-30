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
const API_URL = `http://localhost:${process.env.PORT}`;
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
    let data = {name: faker.lorem.word() + ' ale', type: faker.random.words(3)};
    it('should respond with a 201 status code and a beer object', () => {
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
    it('should respond with a 400 status code if no body is sent.', () => {
      return request.post(`${API_URL}/api/beers`)
        .send(null)
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should respond with a 409 status code if a beer object already exists.', () => {
      return request.post(`${API_URL}/api/beers`)
        .send(tempBeer)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  }); //end of testing POST block
  describe('testing GET /api/beers/:id', () => {
    it('should respond with a 200 status code and a beer object.', () => {
      let tempBeer;
      return mockBeer.createOne()
        .then(beer => {
          tempBeer = beer;
          return request.get(`${API_URL}/api/beers/${tempBeer._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempBeer.name);
          expect(res.body.type).toEqual(tempBeer.type);
          expect(res.body.grain).toEqual([]);
          expect(res.body._id).toExist();
        });
    });
    it('should respond with a 404 status code and not return a beer object.', () => {
      return request.get(`${API_URL}/api.catch(next);/beers/12345`)
        .catch(res => {
          expect(res.status).toEqual(404);
          expect(res.body).toEqual(null);
        });
    });
  }); //end of testing GET /api/beers/:id block
  describe('testing GET /api/beers', () => {
    it('should respond with a an array of 50 beers', () => {
      // let tempBeers;
      return mockBeer.createMany(100)
        .then(() => {
          return request.get(`${API_URL}/api/beers`);
        })
        .then(res => {
          // console.log((res.body).map(beer => beer.name));
          expect(res.status).toEqual(200);
          expect(res.body.length).toEqual(50);
          res.body.forEach(beer => {
            expect(beer._id).toExist();
            expect(beer.grain).toEqual([]);
            expect(beer.name).toExist();
            expect(beer.type).toExist();
          });
        });
    });
  });//end of testing GET /api/beers block
  describe('testing PUT /api/beers', () => {
    it('should respond with a 202 status code and an updated beer object.', () => {
      let data = {name: faker.lorem.word() + ' ale', type: faker.random.words(3)};
      return request.post(`${API_URL}/api/beers`)
        .send(data)
        .then((res) => {
          tempBeer = res.body;
          return request.put(`${API_URL}/api/beers/${tempBeer._id}`)
            .send({name: 'Space Dust', type: 'IPA'});
        })
        .then(res => {
          expect(res.status).toEqual(202);
          expect(res.body.name).toEqual('Space Dust');
          expect(res.body.type).toEqual('IPA');
          tempBeer = res.body;
        });

    });
    // it('should respond with a 400 error code and a beer with name \'Space Dust\'.', () => {
    it('should respond with a 400 error code.', () => {
      return request.post(`${API_URL}/api/beers`)
        .send({name: tempBeer.name, type: tempBeer.type})
        .then((res) => {
          tempBeer = res.body;
          return request.put(`${API_URL}/api/beers/${tempBeer._id}`)
            .send(null);
        })
        .catch(err => {
          expect(err.status).toEqual(400);
        });
    });
    it('should respond with a 404 error code if an ID is not found.', () => {
      return request.get(`${API_URL}/api/beers/12345`)
        .catch(err => {
          expect(err.status).toEqual(404);
        });
    });
  });//end of testing PUT block

});//end of top-level describe block
