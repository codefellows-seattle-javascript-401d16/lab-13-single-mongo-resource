require('dotenv').config({ path: `${__dirname}/../.test.env` });

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

const clearDB = require('./lib/clear-db.js');
const mockCompany = require('./lib/mock-company.js');

let tempCompany;
const API_URL = process.env.API_URL;

describe('testing company routes', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/company', () => {
    let data = {companyName: faker.company.companyName()};
    console.log('data', data);

    it('should respond with a company', () => {
      return superagent.post(`${API_URL}/api/company`)
      .send(data)
      .then(res => {
        console.log('data', data);
        expect(res.status).toEqual(200);
        expect(res.body.companyName).toEqual(data.companyName);
        expect(res.body.products).toEqual([]);
        expect(res.body._id).toExist();
      });
    });

    it('should respond with 400 invalid request body', () => {
      return superagent.post(`${API_URL}/api/company`).send().catch(err => {
        expect(err.status).toEqual(400);
      });
    });
  });

  describe('testing GET /api/company', () => {
    it('should respond with a an array of 50 company', () => {
      return mockCompany.createMany(100)
      .then(company => {
        tempCompany = company;
        return superagent.get(`${API_URL}/api/company/${company._id}`);
      })
      .then(res => {
        console.log(res.body.map(list => list.companyName));
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(50);
        res.body.forEach(list => {
          expect(list._id).toExist();
          expect(list.products).toEqual([]);
          expect(list.companyName).toExist();
        });
      });
    });
    describe('testing GET /api/company', () => {
      it('should respond with a company', () => {
        return superagent
          .get(`${API_URL}/api/company/${tempCompany._id}`)
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body._id).toExist();
            expect(res.body.name).toEqual('John Wick');
            expect(res.body.review).toEqual('A most watch company');
          });
      });
      it('should respond with a 404 not found', () => {
        return superagent.get(`${API_URL}/api/company/`).catch(err => {
          expect(err.status).toEqual(404);
        });
      });
    });

    describe('testing PUT /api/company', () => {
      it('should respond with a 200 and updated company', () => {
        return superagent
          .put(`${API_URL}/api/company/${tempCompany._id}`)
          .send({
            name: 'John Wick 2',
            review: '2 thumbs up',
          })
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body.name).toEqual('John Wick 2');
            expect(res.body.review).toEqual('2 thumbs up');
          });
      });
    });

    describe('testing DELETE /api/company', () => {
      it('should respond with a 200', () => {
        return superagent
          .delete(`${API_URL}/api/company/${tempCompany._id}`)
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body._id).toNotExist();
          });
      });
    });
  });


});
