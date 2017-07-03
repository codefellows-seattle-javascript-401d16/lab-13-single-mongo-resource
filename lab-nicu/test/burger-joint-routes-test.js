'use strict';

require('dotenv').config({ path: `${process.cwd()}/.test.env` });
const superagent = require('superagent');
const expect = require('expect');

const mockBurgerJoints = require('./lib/mock-burger-joints.js');
const clearDB = require('./lib/clear-db.js');
const server = require('../lib/server.js');
const API_URL = `http://localhost:${process.env.PORT}`;
let tempBurger;

describe('testing burger-joint-routes', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing post /api/burger-joint', () => {
    let data = { name: 'Rafiki Burger', location: 'Santeria' };
    it('should return a 200 with the body', () => {
      return superagent.post(`${API_URL}/api/burger-joint`)
        .send(data)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.burgers).toExist();
          expect(res.body.name).toEqual('Rafiki Burger');
        });
    });
    it('should return a 400 with the body', () => {
      return superagent.post(`${API_URL}/api/burger-joint`)
        .send()
        .catch(res => {
          expect(res.status).toEqual(400);
          expect(res.body).toNotExist();
        });
    });
    it('should return a 409 with the body', () => {
      return superagent.post(`${API_URL}/api/burger-joint`)
        .send(data)
        .catch(res => {
          expect(res.status).toEqual(409);
          expect(res.body).toNotExist();
        });
    });
  });

  describe('testing GET /api/buger-joint', () => {
    it('should return with a burger', () => {
      return mockBurgerJoints.createBurgerJoints(1)
        .then(burger => {
          tempBurger = burger;
          return superagent.get(`${API_URL}/api/burger-joint/${tempBurger[0]._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.name).toEqual(tempBurger[0].name);
        });
    });
    it('should return a 404', () => {
      return superagent.get(`${API_URL}/api/burger-joint/bogusid`)
        .catch(res => {
          expect(res.status).toEqual(404);
          expect(res.body).toNotExist();
        });
    });
  });

  describe('testing PUT /api/burger-joint', () => {
    it('should return 200 with a body', () => {
      return mockBurgerJoints.createBurgerJoints(1)
        .then(burger => {
          tempBurger = burger;
          return superagent.put(`${API_URL}/api/burger-joint/${tempBurger[0]._id}`)
            .send({ location: 'Tacoma' });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempBurger[0].name);
          expect(res.body.location).toEqual('Tacoma');
        });
    });
    it('should return 400 due to invalid body', () => {
      return superagent.put(`${API_URL}/api/burger-joint/${tempBurger[0]._id}`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
    it('should return 404 due to invalid id', () => {
      return superagent.put(`${API_URL}/api/burger-joint/xoiasjdiasoim2o3iepo12ke`)
        .send({ location: 'Tacoma' })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE /api/burger-joint', () => {
    it('should return 204 with a body', () => {
      return mockBurgerJoints.createBurgerJoints(1)
        .then(burger => {
          tempBurger = burger;
          return superagent.delete(`${API_URL}/api/burger-joint/${tempBurger[0]._id}`);
        })
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });
    it('should return 404 due to invalid id', () => {
      return superagent.delete(`${API_URL}/api/burger-joint/213123ASDA1`)
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing invalid path', ()=>{
    it('should return a 404', () => {
      return superagent.get(`${API_URL}/api/burgersssssss`)
        .catch(res =>{
          expect(res.status).toEqual(404);
        });
    });
  });
});
