'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});

const expect = require('expect');
const superagent = require('superagent');


const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockYear = require('./lib/mock-year.js');

const API_URL = (process.env.API_URL);
let tempYear;

describe('testing api/years', () => {
  //DONE - TODO: your tests should start your server when they begin and stop your server when they finish
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  //TODO: write a test to ensure that your api returns a status code of 404 for routes that have not been registered

  describe('testing 404 for unregistered routes', () => {
    it('should return 404', () => {
      let data = {name: 2017, dayJan1: 'SUN'};
      return superagent.post(`${API_URL}/api/does-not-exist`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

//TODO: POST - test 200, response body like {<data>} for a post request with a valid body
  describe('testing POST api/years', () => {
    it('should return a status 200 and year', () => {
      let data = {name: 2017, dayJan1: 'SUN'};
      return superagent.post(`${API_URL}/api/years`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(2017);
        expect(res.body.dayJan1).toEqual('SUN');
      });
    });
    //TODO: POST - test 400, with an invalid request body
    it('should return a status 400 with invalid request body - name', () => {
      let data = {name: '2017', dayJan1: 'SUN'};
      return superagent.post(`${API_URL}/api/years`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  //TODO: POST - test 409, with an a conflict for a unique property
    it('should return a status 409 with invalid request body - name', () => {
      let data = {name: 2017, dayJan1: 'SUN'};
      superagent.post(`${API_URL}/api/years`)
      .send(data);
      return superagent.post(`${API_URL}/api/years`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });
  //TODO: GET - test 404, responds with 'not found' for valid request made with an id that was not found
  describe('testing GET api/years/:id', () => {
    beforeEach(() => {
      return mockYear.createOne()
      .then((year) => {
        tempYear = year;
      });
    });
    it('should return a status 404 for invalid id', () => {
      return superagent.get(`${API_URL}/api/years/not-an-id`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  //TODO: GET - test 200, response body like {<data>} for a request made with a valid id
    it('should return a status 200 and year', () => {
      return superagent.get(`${API_URL}/api/years/${tempYear._id}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(tempYear.name);
        expect(res.body.dayJan1).toEqual(tempYear.dayJan1);
      });
    });
  });

  describe('testing PUT api/years/:id', () => {
    beforeEach(() => {
      return mockYear.createOne()
      .then((year) => {
        tempYear = year;
      });
    });
    //TODO: PUT - test 200, response body like {<data>} for a post request with a valid body
    it('should return a status 200 and updated year', () => {
      let data = {name: 2017};
      return superagent.put(`${API_URL}/api/years/${tempYear._id}`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(data.name);
        expect(res.body.dayJan1).toEqual(tempYear.dayJan1);
      });
    });
  //TODO: PUT - test 404, with invalid id
    it('should return a status 404 for invalid id', () => {
      let data = {name: 2017};
      return superagent.put(`${API_URL}/api/years/not-an-id`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  //TODO: PUT - test 400, with invalid body
    it('should return a status 400 with invalid body', () => {
      let data = {name: '2017'};
      return superagent.put(`${API_URL}/api/years/${tempYear._id}`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });
  //TODO: DELETE - test 204, with valid id
  //TODO: DELETE - test 404, with invalid id

}); // end top-level describe block.
