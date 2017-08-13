'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const issue = require('../model/issue.js');
const mockIssue = require('./lib/mock-issue.js');

let tempissue;
const API_URL = process.env.API_URL;

let data = {building: `${faker.company.companyName(2)}`,
  room: `${faker.random.number(3)}`,
  type: mockIssue.randomIssueType()};

describe('testing /api/issues', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/issues', () => {
    it('should respond with a issue', () => {
      console.log('data PUT 200', data);
      return superagent.post(`${API_URL}/api/issues`)
      .send(data)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(data.title);
        expect(res.body.states).toEqual([]);
        expect(res.body._id).toExist();
        tempissue= res.body;
      });
    });
    it('should respond with a 400', () => {
      return superagent.post(`${API_URL}/api/issues`)
      .send({})
      .catch(err => {
        expect(err.status).toEqual(400);
      });
    });
    it('should respond with a 409', () => {
      let tempissue;
      return mockIssue.createOne()
      .then(issue=> {
        tempissue= issue;
        return superagent.post(`${API_URL}/api/issues`)
        .send(tempissue);
      })
      .then(res => {throw res;})
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('testing GET /api/issues/:id', () => {
    it('should respond with a issue', () => {
      let tempissue;
      return mockIssue.createOne()
      .then(issue => {
        tempissue = issue;
        return superagent.get(`${API_URL}/api/issues/${issue._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(tempissue.title);
        expect(res.body.states).toEqual([]);
        expect(res.body._id).toExist();
      });
    });
  });

  describe('testing PUT /api/issues/:id', () => {
    it('should respond with an updated issue', () => {
      let tempissue;
      return mockIssue.createOne()
    .then(issue=> {
      tempissue= issue;
      console.log('tempissue', tempissue);
      return  superagent.put(`${API_URL}/api/issues/${tempissue._id.toString()}`)
      .send({title: 'puttest'});
    })
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body.title).toEqual('puttest');
      expect(res.body.states).toEqual([]);
      expect(res.body._id).toEqual(tempissue._id);
      return issue.findById(tempissue._id);
    });
    });
    it('should respond with a 400', () => {
      return mockIssue.createOne()
      .then(issue=> {
        tempissue= issue;
        return superagent.put(`${API_URL}/api/issues/${tempissue._id.toString()}`)
        .send({});
      })
      .then(res => {throw res;})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 404', () => {
      return mockIssue.createOne()
      .then(issue=> {
        tempissue= issue;
        return superagent.put(`${API_URL}/api/issues/12345}`)
        .send({title:'unfound'});
      })
      .then(res => {
        throw res;
      })
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });

    describe('testing DELETE', () => {
      after(clearDB);
      let tempissue;
      it('should result in a 204', () => {
        return mockIssue.createOne()
        .then(result => {
          tempissue= result;
          return superagent.delete(`${API_URL}/api/issues/${tempissue._id}`)
          .then(res => {
            expect(res.status).toEqual(204);
          });
        });
      });
      it('should respond with a 404', () => {
        return mockIssue.createOne()
            .then(issue=> {
              tempissue= issue;
              return superagent.delete(`${API_URL}/api/issues/12345}`);
            })
              .then(res => {
                throw res;
              })
          .catch(res => {
            expect(res.status).toEqual(404);
          });
      });
    });
  });
});
