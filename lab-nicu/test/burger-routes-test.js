'use strict';

require('dotenv').config({ path: `${process.cwd()}/.test.env` });
const superagent = require('superagent');
const expect = require('expect');

const mockBurger = require('./lib/mock-burger.js');
const mockBurgerJoint = require('./lib/mock-burger-joints.js');
const BurgerJoint = require('../model/burger-joint.js');
const clearDB = require('./lib/clear-db.js');
const server = require('../lib/server.js');
const API_URL = `http://localhost:${process.env.PORT}`;
let tempBurger;
let tempBurgerJoint;

describe('testing /api/burger routes', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/burger', () => {
    it('should return a 200 and a burger', () => {
      return mockBurgerJoint.createBurgerJoints(1)
        .then(burgerJoint => {
          tempBurgerJoint = burgerJoint;
          return superagent.post(`${API_URL}/api/burger`)
            .send({
              name: 'Rafiki Burger',
              burgerJoint: tempBurgerJoint[0]._id,
              stars: 4,
              flavors: ['tangy', 'bitter', 'sweet'],
            });
        })
        .then(res => {
          tempBurger = res.body;
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Rafiki Burger');
          expect(res.body._id).toExist();
          return BurgerJoint.findById(tempBurgerJoint[0]._id);
        })
        .then(burgerJoint => {
          expect(burgerJoint.burgers.length).toEqual(1);
          expect(burgerJoint.burgers[0].toString()).toEqual(tempBurger._id);
        });
    });
    it('should return a 409 and a burger', () => {
      return mockBurgerJoint.createBurgerJoints(1)
        .then(burgerJoint => {
          tempBurgerJoint = burgerJoint;
          return superagent.post(`${API_URL}/api/burger`)
            .send({
              name: 'Rafiki Burger',
              burgerJoint: tempBurgerJoint[0]._id,
              stars: 4,
              flavors: ['tangy', 'bitter', 'sweet'],
            });
        })
        .then(res => {
          tempBurger = res.body;
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Rafiki Burger');
          expect(res.body._id).toExist();
          return BurgerJoint.findById(tempBurgerJoint[0]._id);
        })
        .then(() => {
          return superagent.post(`${API_URL}/api/burger`)
            .send({
              name: 'Rafiki Burger',
              burgerJoint: tempBurgerJoint[0]._id,
              stars: 4,
              flavors: ['tangy', 'bitter', 'sweet'],
            });
        })
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });

    it('should return a 400', () => {
      return superagent.post(`${API_URL}/api/burger`)
        .send({})
        .catch(res => {
          tempBurger = res.body;
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing GET /api/burger', () => {
    it('should return a 200', () => {
      return mockBurger.createBurger(1)
        .then(({ burgerJoints, burgers }) => {
          tempBurger = burgers;
          tempBurgerJoint = burgerJoints;
          return superagent.get(`${API_URL}/api/burger/${burgers[0]._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempBurger[0]._id);
          expect(res.body.name).toEqual(tempBurger[0].name);
        });
    });
    it('should return a 404', () => {
      return superagent.get(`${API_URL}/api/burger/1231asdf123`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing PUT /api/burgers', () => {
    it('should return 200 with a body', () => {
      return mockBurger.createBurger(1)
        .then(({ burgerJoint, burgers }) => {
          tempBurger = burgers;
          tempBurgerJoint = burgerJoint;
          return superagent.put(`${API_URL}/api/burger/${tempBurger[0]._id}`)
            .send({ name: 'Rafiki Burger' });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toEqual(tempBurger[0]._id);
          expect(res.body.name).toEqual('Rafiki Burger');
        });
    });
    it('should return 400', () => {
      return mockBurger.createBurger(1)
        .then(({ burgerJoint, burgers }) => {
          tempBurger = burgers;
          tempBurgerJoint = burgerJoint;
          return superagent.put(`${API_URL}/api/burger/${tempBurger[0]._id}`)
            .send({});
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should return 400', () => {
      return superagent.put(`${API_URL}/api/burger/xxxx123123`)
        .send({ name: 'Brogrammer Burger' })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
  describe('testing DELETE /api/burgers', () => {
    it('should return 200 with a body', () => {
      return mockBurger.createBurger(1)
        .then(({ burgerJoint, burgers }) => {
          tempBurger = burgers;
          tempBurgerJoint = burgerJoint;
          return superagent.delete(`${API_URL}/api/burger/${tempBurger[0]._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });

    it('should return 404', () => {
      return superagent.delete(`${API_URL}/api/burger/xxxx123123`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});