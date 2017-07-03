'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');
const Employer = require('../model/employer.js');
const clearDB = require('./lib/clear-db');
const server = require('../lib/server.js');
const faker = require('faker');
const mockEmployer = require('./lib/mock-employer.js');
const mockEmployee = require('./lib/mock-employee.js');

const API_URL = process.env.API_URL;

describe('testing /api/crews', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/employees', () => {
    it('Should create an employee', () => {
      return mockEmployer.createOne()
      .then(employer => {
        return superagent.post(`${API_URL}/api/employers`)
        .send({
          content: 'hello world',
          employer: faker.name.findName(),
        });
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.content).toEqual('hello world');
        expect(res.body.company).toEqual(tempEmployer._id.toString());

        return Employer.findById(tempEmployer._id);
      })
      .then(employer => {
        expect(employer.employee.length).toEqual(1);
        expect(employer.employees[0].toString()).toEqual(tempEmployee._id.toString());
      });
    });
  });
});
