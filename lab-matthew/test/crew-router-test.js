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


describe('testing /api/crews', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/crews', () => {
    it('should create a crew', () => {
      let tempShip;
      let tempCrew;
      return mockShip.createOne()
      .then(ship => {
        tempShip = ship;
        return superagent.post(`${API_URL}/api/crews`)
        .send({
          name: 'Jack Sparrow',
          profession: 'Piracy',
          age: 38,
          ship: ship._id.toString(),
        });
      })
      .then(res => {
        console.log('RES', res.body);
        expect(res.status).toEqual(200);
        expect(res.body._id).toExist();
        expect(res.body.name).toEqual('Jack Sparrow');
        expect(res.body.profession).toEqual('Piracy');
        expect(res.body.age).toEqual(38);
        expect(res.body.ship).toEqual(tempShip._id.toString());
        tempCrew = res.body;

        return Ship.findById(tempShip._id);
      })
      .then(ship => {
        console.log('SHIP', ship);
        expect(ship.crews.length).toEqual(1);
        expect(ship.crews[0].toString()).toEqual(tempCrew._id.toString());
      });
    });

    it('should respond with a 400 for having a bad ship id', () => {
      return superagent.post(`${API_URL}/api/crews`)
      .send({
        name: 'Pirronopolous',
        age: 17,
        profession: 'Poop-sweeper',
        ship:'595548f2d8e2edfd4f2ecc24',
      })
      .then(res => {throw res})
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
  });

  describe('testing PUT /api/ships/:id', () => {
    it('should respond with the updated crew', () => {
      let tempShip, tempCrew;
      return mockCrew.createOne()
      .then(({ship, crew}) => {
        tempCrew = crew;
        tempShip = ship;
        return superagent.put(`${API_URL}/api/crews/${tempCrew._id.toString()}`)
        .send({age: 21});
      })
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.age).toEqual(21);
        expect(res.body.name).toEqual(tempCrew.name);
        expect(res.body.profession).toEqual(tempCrew.profession);
        expect(res.body.ship).toEqual(tempShip._id);
        return Ship.findById(tempShip._id);
      })
      .then(ship => {
        expect(ship.crews.length).toEqual(1);
        expect(ship.crews[0].toString()).toEqual(tempCrew._id.toString());
      });
    });
    it('should respond with a 400 status', () => {
      return mockCrew.createOne()
      .then(({ship, crew}) => {
        let tempShip = ship;
        let tempCrew = crew;
        return superagent.put(`${API_URL}/api/crews/${tempCrew._id.toString()}`)
        .send({name: 'ba'});
      })
      .then(res => {
        throw res;
      })
      .catch(res => {
        expect(res.status).toEqual(400);
      });
    });
    it('should respond with a 404 status', () => {
      return mockCrew.createOne()
      .then(({ship, crew}) => {
        let tempShip = ship;
        let tempCrew = crew;
        return superagent.put(`${API_URL}/api/crews/3428374fnf8nf89232`)
        .send({name: 'ba'});
      })
      .then(res => {
        throw res;
      })
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });


  describe('testing GET /api/crews', () => {
    after(clearDB);
    let tempCrew;

    it('should respond with a 200 status', () => {
      return mockCrew.createOne()
      .then(result => {
        tempCrew = result.crew;
        return superagent.get(`${API_URL}/api/crews/${tempCrew._id.toString()}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual(tempCrew.name);
          expect(res.body.profession).toEqual(tempCrew.profession);
          expect(res.body.age).toEqual(tempCrew.age);
        });
      });
    });
    it('should respond with a 404 status', () => {
      return superagent.get(`${API_URL}/api/crews/298472809ufjf9jf9283`)
      .then(res => {
        throw res;
      })
      .catch(res => {
        expect(res.status).toEqual(404);
      });
    });
  });


  describe('testing DELETE /api/crews', () => {
    after(clearDB);
    let tempCrew;
    it('should respond with a 204 status', () => {
      return mockCrew.createOne()
      .then(result => {
        tempCrew = result.crew;
        return superagent.delete(`${API_URL}/api/crews/${tempCrew._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
      });
    });
    it('should respond with a 404 status', () => {
      return mockCrew.createOne()
      .then(result => {
        tempCrew = result.crew;
        return superagent.delete(`${API_URL}/api/crews/29848wufj2983u29j23`)
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
