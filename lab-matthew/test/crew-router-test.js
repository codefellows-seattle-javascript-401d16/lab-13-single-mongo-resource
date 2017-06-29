'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

//npm modules
const expect = require('expect');
const superagent = require('superagent');

//app modules
const Ship = require('../model/ship.js');
const clearDB = require('./lib/clear-db');
const server = require('../lib/server.js');
const mockShip = require('./lib/mock-ship');
const mockCrew = require('./lib/mock-crew');

//module logic
const API_URL = process.env.API_URL;

let tempShip;
let tempCrew;

describe('testing /api/crews', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/crews', () => {
    it('should create a crew', () => {
      return mockShip.createOne()
      .then(ship => {
        return superagent.post(`${API_URL}/api/crews`)
        .send({
          content: 'hello world',
          ship: ship._id.toString(),
        });
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.content).toEqual('hello world');
        expect(res.body.ship).toEqual(tempShip._id.toString());

        return Ship.findById(tempShip._id);
      })
      .then(ship => {
        expect(ship.crews.length).toEqual(1);
        expect(ship.crews[0].toString()).toEqual(tempCrew._id.toString());
      });
    });
  });

});
