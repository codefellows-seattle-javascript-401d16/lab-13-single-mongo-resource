'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockShip = require('./lib/mock-ship.js');

let tempShip;
let tempName;
const API_URL = process.env.API_URL;

describe('testing /api/ships', () => {
  before(server.start);
  after(server.stop);
  after(clearDB);

  describe('testing POST /api/ships', () => {
    let data = {name: `${faker.company.bsAdjective(1)} ${faker.company.bsNoun(1)}`,
      type: mockShip.randomShipType(),
      captain: `${faker.name.firstName()} ${faker.name.lastName()}`,
    };
    tempName = data.name;
    it('should respond with a ship and a 200 status', () => {
      return superagent.post(`${API_URL}/api/ships`)
      .send(data)
      .then(res => {
        console.log(data);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(data.name);
        expect(res.body.type).toEqual(data.type);
        expect(res.body.captain).toEqual(data.captain);
      });
    });
    it('should respond with a 400 status', () => {
      return superagent.post(`${API_URL}/api/ships`)
      .send({})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 409 status', () => {
      let dupData = {name: tempName,
        type: mockShip.randomShipType(),
        captain: `${faker.name.firstName()} ${faker.name.lastName()}`,
      };
      return superagent.post(`${API_URL}/api/ships`)
      .send(dupData)
      .catch(res => {
        expect(res.status).toEqual(409);
      });
    });
  });

  describe('testing GET /api/ships', () => {
    it('should respond with a ship and a 200 status', () => {
      return mockShip.createOne()
      .then(ship => {
        tempShip = ship;
        return superagent.get(`${API_URL}/api/ships${tempShip._id}`);
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(tempShip.name);
        expect(res.body.type).toEqual(tempShip.type);
        expect(res.body.captain).toEqual(tempShip.captain);
        expect(res.body._id).toExist();
      });
    });
    it('should respond with a 404 status', () => {
      return mockShip.createOne()
      .then(ship => {
        tempShip = ship;
        return superagent.get(`${API_URL}/api/ships/5954338255ccf25a3ec539fc`);
      })
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('testing PUT /api/ships/:id', () => {
    after(clearDB);
    beforeEach(() => {
      return mockShip.createOne()
      .then(ship => {
        tempShip = ship;
      });
    });
    it('should respond with an updated ship and 200 status', () => {
      return superagent.put(`${API_URL}/api/ships/${tempShip._id}`)
      .send({name: 'The SS Rage'})
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body._id).toEqual(tempShip._id);
        expect(res.body.name).toEqual('The SS Rage');
        expect(res.body.type).toEqual(tempShip.type);
        expect(res.body.captain).toEqual(tempShip.captain);
      });
    });
    it('should respond with a 400 status', () => {
      return superagent.put(`${API_URL}/api/ships/${tempShip._id}`)
      .send({name:'hi'})
      .catch(res => {
        console.log('After updated body put', res.body);
        console.log('RES.STATUS', res.status);
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 404 status', () => {
      return superagent.put(`${API_URL}/api/ships/1328472`)
      .send({name: 'Master Holbert'})
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });

  describe('testing DELETE /api/ships', () => {
    return mockShip.createOne()
    .then(ship => {
      tempShip = ship;
    });
  });
  it('should sink (delete) a ship and return a 204 status', () => {
    return superagent.delete(`${API_URL}/api/ships/${tempShip._id}`)
    .then(res => {
      expect(res.status).toEqual(204);
    });
  });
  it('should sink (delete) a ship and return a 404 status', () => {
    return superagent.delete(`${API_URL}/api/ships/3245674533254754`)
    .catch(res => {
      expect(res.status).toEqual(404);
    });
  });


});
