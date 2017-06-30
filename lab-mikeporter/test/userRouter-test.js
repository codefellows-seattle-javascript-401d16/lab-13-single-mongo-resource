'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clearDB.js');
const mockUsers = require('./lib/mockUsers.js');

const API_URL = process.env.API_URL;

describe('testing /api/users paths', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST /api/users', () => {
    it('should return a User and 200', () => {
      let fakeUser = {
        name: faker.name.firstName(),
        city: faker.address.city(),
        weight: faker.random.number(),
      };
      return superagent.post(`${API_URL}/api/users`)
        .send(fakeUser)
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(fakeUser.name);
          expect(res.body.weight).toEqual(fakeUser.weight);
          expect(res.body.city).toEqual(fakeUser.city);
          expect(res.body.posts).toEqual([]);
          expect(res.body._id).toExist();
        });
    });
    it('should return 400 with invalid body request', () => {
      return superagent.post(`${API_URL}/api/users`)
        .send({})
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
    it('should return 409 with duplicate key fails validation', () => {
      return mockUsers.one()
        .then((user) => {
          let tempUser = user;
          return superagent.post(`${API_URL}/api/users`)
            .send(tempUser)
            .catch((res) => {
              expect(res.status).toEqual(409);
            });
        });
    });
  });

  describe('testing GET request to /api/users/:id', () => {
    it('valid GET expect to return user and 200', () => {
      let tempUser;
      return mockUsers.one()
        .then((user) => {
          tempUser = user;
          return superagent.get(`${API_URL}/api/users/${tempUser._id}`);
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(tempUser.name);
          expect(res.body.city).toEqual(tempUser.city);
          expect(res.body.weight).toEqual(tempUser.weight);
          expect(res.body._id).toEqual(tempUser._id);
          expect(res.body.posts).toEqual([]);
        });
    });
    it('valid GET to /api/users returns 10 users', () => {
      return mockUsers.many(30)
        .then(() => {
          return superagent.get(`${API_URL}/api/users`);
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.length).toEqual(10);
          res.body.forEach((user) => {
            expect(user.name).toExist();
            expect(user.city).toExist();
            expect(user.weight).toExist();
            expect(user._id).toExist();
            expect(user.posts).toEqual([]);
          });
        });
    });
    it('valid GET to /api/users returns 10 users from page 2', () => {
      return mockUsers.many(30)
        .then(() => {
          return superagent.get(`${API_URL}/api/users?page=2`);
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.length).toEqual(10);
          res.body.forEach((user) => {
            expect(user.name).toExist();
            expect(user.city).toExist();
            expect(user.weight).toExist();
            expect(user._id).toExist();
            expect(user.posts).toEqual([]);
          });
        });
    });
    it('invalid GET fake id to 404', () => {
      return mockUsers.one()
        .then((user) => {
          return superagent.get(`${API_URL}/api/users/3`);
        })
        .catch((res) => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing PUT on /api/users/:id', () => {
    it('valid PUT should return updated user and 200', () => {
      let tempUser;
      let fakeUser = {
        name: faker.name.firstName(),
        city: faker.address.city(),
        weight: faker.random.number(),
      };
      return mockUsers.one()
        .then((user) => {
          tempUser = user;
          return superagent.put(`${API_URL}/api/users/${tempUser._id}`)
            .send(fakeUser);
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual(fakeUser.name);
          expect(res.body.weight).toEqual(fakeUser.weight);
          expect(res.body.city).toEqual(fakeUser.city);
          expect(res.body._id).toEqual(tempUser._id);
          expect(res.body.posts).toEqual([]);
        });
    });
    it('valid PUT should return 200 user empty request with original user body', () => {
      let tempUser;
      return mockUsers.one()
        .then((user) => {
          tempUser = user;
          return superagent.put(`${API_URL}/api/users/${tempUser._id}`)
            .send({})
            .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.body.name).toEqual(tempUser.name);
              expect(res.body.weight).toEqual(tempUser.weight);
              expect(res.body.city).toEqual(tempUser.city);
              expect(res.body._id).toEqual(tempUser._id);
              expect(res.body.posts).toEqual([]);
            });
        });
    });
    it('invalid PUT should return 400 user with invalid property CAR', () => {
      let tempUser;
      let fakeUser = {
        car: 'blue',
      };
      return mockUsers.one()
        .then((user) => {
          tempUser = user;
          return superagent.put(`${API_URL}/api/users/${tempUser._id}`)
            .send(fakeUser)
            .then((res) => {
              if(!res.body[Object.keys(fakeUser)[0]])
                throw 400;
            })
            .catch((err) => {
              expect(err).toEqual(400);
            });
        });
    });
    it('valid PUT should return 400 user with invalid users ID', () => {
      let fakeUser = {
        name: faker.name.firstName(),
        city: faker.address.city(),
        weight: faker.random.number(),
      };
      return mockUsers.one()
        .then(() => {
          return superagent.put(`${API_URL}/api/users/3`)
            .send(fakeUser)
            .catch((err) => {
              expect(err.status).toEqual(404);
            });
        });
    });
  });

  describe('testing DELETE to /api/users/:id', () => {
    it('should return valid DELETE 204', () => {
      let tempUser;
      return mockUsers.one()
        .then((user) => {
          tempUser = user;
          return superagent.delete(`${API_URL}/api/users/${tempUser._id}`);
        })
        .then((res) => {
          expect(res.status).toEqual(204);
        });
    });
    it('should return invalid DELETE 404 with invalid id', () => {
      return mockUsers.one()
        .then((user) => {
          return superagent.delete(`${API_URL}/api/users/3`);
        })
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });

  describe('testing 404 for invalid urls', () => {
    it('should respond with 404 for /api/potato', () => {
      return superagent.get(`${API_URL}/api/potato`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
    it('should respond with 404 for /potato', () => {
      return superagent.get(`${API_URL}/potato`)
        .catch((err) => {
          expect(err.status).toEqual(404);
        });
    });
  });
});
