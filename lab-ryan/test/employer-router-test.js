'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockEmployer = require('./lib/mock-employer.js');

const API_URL = process.env.API_URL;
let tempEmployer;
let tempEmployers;


describe('Testing /api/employers', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('Testing POST /api/employers.', () => {
    after(clearDB);
    let data = {
      company: faker.company.companyName(),
      name: faker.name.findName(),
    };

    it('Should respond with a 404 status.', () => {
      return superagent.post(`${API_URL}/api/employershhh`)
    .send({})
    .catch(res => {
      expect(res.status).toEqual(404);
    });
    });

    it('Should respond with an employer.', () => {
      return superagent.post(`${API_URL}/api/employers`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.company).toEqual(data.company);
        expect(res.body.employees).toEqual([]);
        expect(res.body._id).toExist();
      })
      .catch((err) => {
        console.log(err);
      });
    });

    it('Should return a status 400 with invalid request.', () => {
      let data = {company: 'codefellows', name: 'Ryan'};
      return superagent.post(`${API_URL}/api/employers`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });

    it('Should return a status 409 with invalid request.', () => {
      let data = {company: 'codefellows', name: 'Ryan'};
      superagent.post(`${API_URL}/api/employers`)
      .send(data);
      return superagent.post(`${API_URL}/api/employers`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });

    describe('testing GET api/employers/:id', () => {
      beforeEach(() => {
        return mockEmployer.createOne()
        .then((employer) => {
          tempEmployer = employer;
        });
      });

      beforeEach(() => {
        return mockEmployer.createMany(20)
        .then((employers) => {
          tempEmployers = employers;
        });
      });

      it('Should return a 404 status for an invalid ID.', () => {
        return superagent.get(`${API_URL}/api/employers/invalid-id`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
      });

      it('Should respond with a 200 status and an employer.', () => {
        let url = `${API_URL}/api/employers/${tempEmployer._id}`;
        return superagent.get(url)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempEmployer.name);
          expect(res.body.company).toEqual(tempEmployer.company);
          expect(res.body._id).toExist();
        })
        .catch((err) => console.error(err));
      });
      it('Should return a 200 status and array of 3 employers', () => {
        return superagent.get(`${API_URL}/api/employers`)
        .then(res => {
          console.log(res.body.map(employer => employer.name));
          expect(res.status).toEqual(200);
          expect(res.body.length).toEqual(3);
          res.body.forEach(employer => {
            expect(employer._id).toExist();
            expect(employer.name).toExist();
          });
        });
      });
    });

    describe('Testing PUT api/employers/:id', () => {
      beforeEach(() => {
        return mockEmployer.createOne()
        .then((employer) => {
          tempEmployer = employer;
        });
      });
      it('Should return a 200 status and an updated employer.', () => {
        let data = {name: 'Ryan'};
        return superagent.put(`${API_URL}/api/employers/${tempEmployer._id}`)
        .send(data)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.company).toEqual(data.company);
          expect(res.body.emplyee).toEqual(tempEmployer.employee);

        });
      });

      it('Should return a 404 status for invalid id.', () => {
        let data = {name: 'Ryan'};
        return superagent.put(`${API_URL}/api/employers/invalid-id`)
      .send(data)
      .catch(res => {
        expect(res.status).toEqual(404);
      });
      });

      it('Should return a 400 status with invalid body.', () => {
        let data = {name: 'Ryan'};
        return superagent.put(`${API_URL}/api/employers/${tempEmployer._id}`)
    .send(data)
    .catch(res => {
      expect(res.status).toEqual(400);
    });
      });
    });
    describe('Testing DELETE api/emplyers/:id', () => {
      beforeEach(() => {
        return mockEmployer.createOne()
      .then((employer) => {
        tempEmployer = employer;
      });
      });
      it('Should return a 204 status for valid id', () => {
        return superagent.delete(`${API_URL}/api/employers/${tempEmployer._id}`)
    .catch(res => {
      expect(res.status).toEqual(204);
    });
      });
      it('Should return a 404 status for valid id', () => {
        return superagent.delete(`${API_URL}/api/employers/invalid-id`)
    .catch(res => {
      expect(res.status).toEqual(404);
    });
      });
    });
  });
});
