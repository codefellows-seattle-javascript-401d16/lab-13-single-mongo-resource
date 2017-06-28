'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockShip = require('./lib/mock-ship.js');

let tempShip;
const API_URL = process.env.API_URL;

describe('testing /api/ships', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/ships', () => {
    let data = {name: `${faker.company.bsAdjective(1)} ${faker.company.bsNoun(1)}`,
      type: mockShip.randomShipType(),
      captain: `${faker.name.firstName} ${faker.name.lastName}`,
    };
    it('should respond with a ship', () => {
      return superagent.post(`${API_URL}/api/lists`)
      .send(data)
      .then(res => {
        console.log('data', data);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(data.name);
        expect(res.body.type).toEqual(data.type);
        expect(res.body.captain).toEqual(data.captain);
      });
    });
  });



});
