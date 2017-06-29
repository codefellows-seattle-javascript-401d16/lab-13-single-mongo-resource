'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});
const faker = require('faker');
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockSchool = require('./lib/mock-school.js');

let tempSchool;
const API_URL = process.env.API_URL;

describe('testing schools routes', () => {
  before(server.start);
  after(server.stop);
  after(clearDB);

  describe('test POST /api/schools', () => {

    let data = {
      schoolName: faker.name.firstName(),
    };

    it('should respond with a school and 200 status', () => {
      console.log(data, '+++++++++++++++');
      return superagent.post(`${API_URL}/api/schools`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.schoolName).toEqual(data.schoolName);
      })
      .catch(error => {
        console.log(error.message);
      });
    });
    it('should reply with a 400', () => {
      return superagent.post(`${API_URL}/api/schools`)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 409', () => {
      return superagent.post(`${API_URL}/api/schools`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('test GET /api/schools/:id', () => {
    it('should respond with a school', () =>  {
      return mockSchool.createOne()
      .then(school => {
        tempSchool = school;
        return superagent.get(`${API_URL}/api/schools/${tempSchool._id}`);
      })
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body._id).toEqual(tempSchool._id);
      expect(res.body.schoolName).toEqual(tempSchool.schoolName);
      expect(res.body.location).toEqual(tempSchool.location);
    });
    });

    it('should respond with a 404', () => {
      superagent.get(`${API_URL}/api/schools/4`)
      .then(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('test PUT /api/schools/:id', () => {
    tempSchool;
    it('should respond with an updated school', () => {

      let data = mockSchool.createOne();

      return mockSchool.createOne()
      .then(school => {
        tempSchool = school;
        return superagent.put(`${API_URL}/api/schools/${tempSchool._id}`)
        .send(data);
      })
      .then( res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempSchool._id);
        expect(res.body.schoolName).toEqual(tempSchool.schoolName);
      });
    });

    it('should respond with a school', () => {
      return superagent.put(`${API_URL}/api/schools/${tempSchool._id}`)
      .send({})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 404', () => {
      superagent.put(`${API_URL}/api/schools/4`)
      .then(err => {
        expect(err.status).toEqual(404);
      });
    });
  });

  describe('test DELETE /api/schools/:id', () => {
    let tempSchool;
    it('should delete a school', () => {
      return mockSchool.createOne()
      .then(school => {
        tempSchool = school;
        return superagent.delete(`${API_URL}/api/schools/${tempSchool._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(204);
      });
    });

    it('bad id should respond with a 404', () => {
      return superagent.delete(`${API_URL}/api/schools/5`)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });
});
