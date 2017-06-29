'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearTrainer = require('./lib/clearTrainers.js');
const mockTrainer = require('./lib/mockTrainer.js');

const API_URL = `http://localhost:${process.env.PORT}`;

let tempTrainer;

describe('Testing resource requests', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearTrainer);

  describe('Testing POST requests', () => {
    let trainerData = {name: faker.name.title()};
    it('Should post data and return a 200 status', () => {
      return superagent.post(`${API_URL}/api/trainers`)
      .send(trainerData)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(trainerData.name);
        expect(res.body.plan).toEqual([]);
        expect(res.body._id).toExist();
      });
    });
  });
  describe('Testing GET requests', () => {
    it('Should return trainer name with 200 status', () => {
      let tempTrainer;
      return mockTrainer.createOne()
      .then(trainer => {
        tempTrainer = trainer;
        return superagent.get(`${API_URL}/api/trainers/${trainer._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(tempTrainer.name);
        expect(res.body._id).toExist();
        expect(res.body.plan).toEqual([]);
      });
    });
  });
  describe('Testing PUT requests', () => {
    it('should update db and return 200 status', () => {
      let trainerData = {name: faker.name.title()};
      let tempTrainer;
      return mockTrainer.createOne()
      .then(trainer => {
        tempTrainer = trainer;
        console.log('hero', trainerData);
        console.log('hit', tempTrainer);
        return superagent.put(`${API_URL}/api/trainers/${trainer._id}`)
        .send({trainerData});
      })
      .then(res => {
        console.log('poop', tempTrainer);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(tempTrainer.name);
        expect(res.body_id).toExist();
        expect(res.body.plan).toEqual([]);
      });
    });
  });
});
