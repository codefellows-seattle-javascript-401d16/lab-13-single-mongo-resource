'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockNation = require('./lib/mock-nation.js');

let tempNation;
const API_URL = process.env.API_URL;


describe('testing /api/nations', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/nations', () => {
    let data = {title: faker.name.title()};
    it('should respond with a nation', () => {
      return superagent.post(`${API_URL}/api/nations`)
      .send(data)
      .then(res => {
        console.log('data', data);
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(data.title);
        expect(res.body.teams).toEqual([]);
        expect(res.body._id).toExist();
      });
    });
  });

  describe('testing GET /api/nations/:id', () => {
    it('should respond with a nation', () => {
      let tempNation;
      return mockNation.createOne()
      .then(nation => {
        tempNation = nation;
        return superagent.get(`${API_URL}/api/nations/${nation._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(tempNation.title);
        expect(res.body.teams).toEqual([]);
        expect(res.body._id).toExist();
      });
    });
  });

  describe('testing GET /api/nations', () => {
    it('should respond with a an array of 50 nation', () => {
      let tempNations;
      return mockNation.createMany(100)
      .then(nations => {
        tempNations = nations;
        return superagent.get(`${API_URL}/api/nations`);
      })
      .then(res => {
        console.log(res.body.map(nation => nation.title));
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(50);
        res.body.forEach(nation => {
          expect(nation._id).toExist();
          expect(nation.teams).toEqual([]);
          expect(nation.title).toExist();
        });
      });
    });
  
    it('should respond with a an array of 50 nation', () => {
      let tempNations;
      return mockNation.createMany(100)
      .then(nations => {
        tempNations = nations;
        return superagent.get(`${API_URL}/api/nations?page=2`);
      })
      .then(res => {
        console.log(res.body.map(nation => nation.title));
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(50);
        res.body.forEach(nation => {
          expect(nation._id).toExist();
          expect(nation.teams).toEqual([]);
          expect(nation.title).toExist();
        });
      });
    });

    it('should respond with a an array of 50 nation', () => {
      let tempNations;
      return mockNation.createMany(100)
      .then(nations => {
        tempNations = nations;
        return superagent.get(`${API_URL}/api/nations?page=3`);
      })
      .then(res => {
        console.log(res.body.map(nation => nation.title));
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(0);
      });
    });
  });
});
