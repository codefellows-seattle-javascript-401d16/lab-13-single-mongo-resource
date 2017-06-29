'use strict';

require('dotenv').config();
const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

const API_URL = `http://localhost:${process.env.PORT}`;
let tempUser;

describe('testing user routes', () => {
  before(server.start);
  after(server.stop);

  describe('test POST /api/user',() => {
    it('should respond with 200 status and user', () => {
      return superagent.post(`${API_URL}/api/user`)
        .send({ name: 'michael', password: '1234' })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('michael');
          expect(res.body.password).toEqual('1234');
          expect(res.body._id).toExist();
          tempUser = res.body;
        });
    });

    it('should respond with 401 status', () => {
      return superagent.post(`${API_URL}/api/user`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(401);
        });
    });

    it('should respond with 409 status', () => {
      return superagent.post(`${API_URL}/api/user`)
        .send({ name: 'michael', password: '1234' })
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('testing GET /api/user', () => {
    it('should respond with 200 status and user', () => {
      return superagent.get(`${API_URL}/api/user/${tempUser._id}`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('michael');
          expect(res.body.password).toEqual('1234');
          expect(res.body._id).toEqual(tempUser._id);
        });
    });

    it('should respond with 200 status and array of user ids', () => {
      return superagent.get(`${API_URL}/api/user`)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(Array.isArray(res.body)).toExist();
          expect(res.body[res.body.length - 1]).toEqual(tempUser._id);
        });
    });
  });

  describe('testing PUT /api/user', () => {
    it('should respond with 200 status and user', () => {
      return superagent.put(`${API_URL}/api/user/${tempUser._id}`)
        .send({ name: 'michael', password: '123456' })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('michael');
          expect(res.body.password).toEqual('123456');
          expect(res.body._id).toEqual(tempUser._id);
        });
    });

    it('should respond with 404 status', () => {
      return superagent.put(`${API_URL}/api/user`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });

    it('should respond with 400 status', () => {
      return superagent.put(`${API_URL}/api/user/${tempUser._id}`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing DELETE /api/user', () => {
    it('should respond with 204 status', () => {
      return superagent.delete(`${API_URL}/api/user/${tempUser._id}`)
        .then(res => {
          expect(res.status).toEqual(204);
        });
    });

    it('should respond with 404 status', () => {
      return superagent.delete(`${API_URL}/api/user`)
        .send({})
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});
