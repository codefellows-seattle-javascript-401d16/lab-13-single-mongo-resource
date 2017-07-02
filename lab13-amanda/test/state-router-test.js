'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const expect = require('expect');
const superagent = require('superagent');

const clearDB = require ('./lib/clear-db.js');
const server = require ('../lib/server.js');
const issue = require('../model/issue.js');
const mockIssue = require('./lib/mock-issue.js');
const mockState = require('./lib/mock-state.js');

const API_URL = process.env.API_URL; //what is process.env.API_URL again?

describe('testing /api/states', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/states', () => {
    it('should create a new state', () => {
      let tempissue;
      let tempState;
      return mockState.createOne()
      .then(issue => {
        tempissue = issue;
        return superagent.post(`${API_URL}/api/states`)
        .send({
          content: 'new state',
          issue: issue._id.toString(),
        });
      })

    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body._id).toExist();
      expect(res.body.content).toEqual('new state');
      expect(res.body.issue).toEqual(tempissue._id.toString);
      tempissue = res.body;
      return issue.findById(tempissue._id);
    })

    .then(issue => {
      expect(issue.tasks.length).toEqual(1);
      expect(issue.tasks[0].toString()).toEqual(tempState._id.toString());
    });
    });

    it('should respond with a 400 for having a bad issue id', () => {
      return superagent.post(`${API_URL}/api/states`)
      .send({
        content: 'bogus issue id',
        issue: '123456bad',
      })
      .then(res => {throw res;})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing PUT /api/states/:id', () => {
    it('should respond with the updated state', () => {
      let tempissue, tempState;
      return mockState.createOne()
        .then(({issue, state}) => { //what is happening here?
          tempState = state;
          tempissue = issue;
          return superagent.put(`${API_URL}/api/states/${tempState._id.toString()}`)
          .send({content: 'updated state'});
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.content).toEqual('updated state');
          expect(res.body._id).toEqual(tempState._id);
          expect(res.body._id).toEqual(tempissue._id);
          return issue.findById(tempissue._id);
        })

        .then(issue => {
          expect(issue.states.length).toEqual(1);
          expect(issue.states[0].toString()).toEqual(tempState._id.toString());
        });
    });
  });
});
