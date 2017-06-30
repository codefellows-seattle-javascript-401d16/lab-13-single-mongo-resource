'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});

//npm modules
const expect = require('expect');
const superagent = require ('superagent');

//app modules
const clearDB = require('./lib/clear-db.js');
const server = require('../lib/server.js');
const Year = require('../model/year.js');
const mockYear = require('./lib/mock-year.js');
const mockDay = require('./lib/mock-day.js');

//module constants
const API_URL = process.env.API_URL;
let tempYear;
let tempDay;

describe('testing /api/days', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  //TODO: POST - test 200, response body like {<data>} for a post request with a valid body
  describe('testing POST /api/days', () => {
    it('should respond with 200 and create a day', () => {
      return mockYear.createOne()
      .then(year => {
        tempYear = year;
        return superagent.post(`${API_URL}/api/days`)
        .send({
          dayOfWeek: 'sun',
          dayOfYear: 1,
          year: tempYear._id.toString(),
        });
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.dayOfWeek).toEqual('sun');
        expect(res.body.dayOfYear).toEqual(1);
        expect(res.body.year).toEqual(tempYear._id.toString());
        tempDay = res.body;
        return Year.findById(tempYear._id);
      })
      .then(year => {
        expect (year.days.length).toEqual(1);
        expect(year.days[0].toString()).toEqual(tempDay._id.toString());
      });
    });
    //TODO: POST - test 400, with an invalid request body
    it('should return a status 400 with invalid request body - dayOfWeek', () => {
      let data = {dayOfWeek: 'asdf', dayOfYear: 1, year: tempYear._id.toString()};
      return mockYear.createOne()
      .then(year => {
        tempYear = year;
        return superagent.post(`${API_URL}/api/days`)
        .send(data)
        .then(res => {throw res;})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
    //TODO: POST - test 409, with an a conflict for a unique property
    it('should return a status 409 with duplicate request body - name', () => {
      let data = {dayOfWeek: 'sun', dayOfYear: 1, year: tempYear._id.toString()};
      return mockYear.createOne()
      .then(year => {
        tempYear = year;
        superagent.post(`${API_URL}/api/days`)
        .send(data);
        return superagent.post(`${API_URL}/api/days`)
        .send(data)
        .catch(res => {
          expect(res.status).toEqual(409);
        });
      });
    });
  });
    //TODO: GET - test 404, responds with 'not found' for valid request made with an id that was not found
  describe('testing GET api/days/:id', () => {
    it('should return a status 404 for invalid id', () => {
      return mockDay.createOne()
      .then((year) => {
        tempYear = year;
        return superagent.get(`${API_URL}/api/days/not-an-id`)
        .then(res => {throw res;})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
  //TODO: GET - test 200, response body like {<data>} for a request made with a valid id
    it('should return a status 200 and day', () => {
      return mockDay.createOne()
      .then((year) => {
        tempYear = year;
        return superagent.get(`${API_URL}/api/days/${tempYear.day._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.dayOfWeek).toEqual(tempYear.day.dayOfWeek);
          expect(res.body.dayOfYear).toEqual(tempYear.day.dayOfYear);
        });
      });
    });
  });
  describe('testing PUT /api/days', () => {
    //TODO: PUT - test 200, response body like {<data>} for a post request with a valid body
    it('should return a status 200 and updated year', () => {
      let data = {dayOfYear: 1};
      return mockDay.createOne()
      .then((year) => {
        tempYear = year;
        return superagent.put(`${API_URL}/api/days/${tempYear.day._id}`)
        .send(data)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.dayOfYear).toEqual(data.dayOfYear);
        });
      });
    });
  // TODO: PUT - test 404, with invalid id
    it('should return a status 404 for invalid id', () => {
      let data = {dayOfYear: 1};
      return superagent.put(`${API_URL}/api/years/not-an-id`)
      .send(data)
      .then(res => {throw res;})
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  //TODO: PUT - test 400, with invalid body
    it('should return a status 400 with invalid body', () => {
      let data = {dayOfYear: 'asdf'};
      return mockDay.createOne()
      .then((year) => {
        tempYear = year;
        return superagent.put(`${API_URL}/api/days/${tempYear.day._id}`)
        .send(data)
        .then(res => {throw res;})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
      });
    });
  });
  describe('testing DELETE api/years/:id', () => {
    //TODO: DELETE - test 204, with valid id
    it('should return a status 204 for valid id', () => {
      return mockDay.createOne()
      .then((year) => {
        tempYear = year;
        return superagent.delete(`${API_URL}/api/days/${tempYear.day._id}`)
        .then(res => {throw res;})
        .catch(res => {
          expect(res.status).toEqual(204);
        });
      });
    });
    //TODO: DELETE - test 404, with invalid id
    it('should return a status 404 for valid id', () => {
      return mockDay.createOne()
      .then((year) => {
        tempYear = year;
        return superagent.delete(`${API_URL}/api/days/not-an-id`)
        .then((res) => {throw res;})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });
    });
  });
});
