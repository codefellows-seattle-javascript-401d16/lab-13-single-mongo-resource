'use strict';

require('dotenv').config({path: `${__dirname}/./.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const User = require('../model/user.js');
const mockUsers = require('./lib/mockUsers.js');
const mockPosts = require('./lib/mockPosts.js');
const clearDB = require('./lib/clearDB.js');

const API_URL = process.env.API_URL;

describe('testing /api/posts', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('testing POST on /api/posts', () => {
    it('should POST create one task and return 200', () => {
      let tempUser;
      let tempPost;
      return mockUsers.one()
        .then((user) => {
          tempUser = user;
          tempPost = {
            phoneNumber: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            ad: faker.hacker.phrase(),
            user: user._id.toString(),
          };
          return superagent.post(`${API_URL}/api/posts`)
            .send(tempPost);
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.user).toEqual(tempPost.user);
          expect(res.body.phoneNumber).toEqual(tempPost.phoneNumber);
          expect(res.body.ad).toEqual(tempPost.ad);
          expect(res.body.address).toEqual(tempPost.address);
          tempPost = res.body;
          return User.findById(tempUser._id);
        })
        .then((user) => {
          expect(user.posts.length).toEqual(1);
          expect(user.posts[0]).toEqual(tempPost._id);
        });
    });
    it('should POST an invalid body request and return 400', () => {
      return mockUsers.one()
        .then((user) => {
          return superagent.post(`${API_URL}/api/posts`)
            .send({});
        })
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
    it('should POST an invalid body request and return 400', () => {
      return mockUsers.one()
        .then((user) => {
          return superagent.post(`${API_URL}/api/posts`)
            .send({ phoneNumber: faker.phone.phoneNumber() });
        })
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
    it('should POST a duplicate id request and return 409', () => {
      return mockPosts.one()
        .then((post) => {
          let tempPost = post;
          return superagent.post(`${API_URL}/api/posts`)
            .send(tempPost);
        })
        .catch((res) => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('GET on /api/posts/:id', () => {
    it('should GET return a post and a response 200', () => {
      let tempPost;
      mockPosts.one()
        .then((post) => {
          tempPost = post;
          return superagent.get(`${API_URL}/api/posts/${tempPost._id}`);
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.id).toEqual(tempPost._id);
          expect(res.body.ad).toEqual(tempPost.ad);
          expect(res.body.address).toEqual(tempPost.address);
          expect(res.body.phoneNumber).toEqual(tempPost.phoneNumber);
          expect(res.body.user).toEqual(tempPost.user);
        });
    });
    it('should GET return a post not found and a response 404', () => {
      mockPosts.one()
        .then((post) => {
          return superagent.get(`${API_URL}/api/posts/3`);
        })
        .catch((res) => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing PUT at /api/posts/:id', () => {
    it('should PUT properly update the schema and return 200', () => {
      let tempPost;
      let fakePost = {
        phoneNumber: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        ad: faker.hacker.phrase(),
      };
      mockPosts.one()
        .then((post) => {
          tempPost = post;
          return superagent.put(`${API_URL}/api/posts/${tempPost._id}`)
            .send(fakePost);
        })
        .then((post) => {
          expect(res.status).toEqual(200);
          expect(res.body.phoneNumber).toEqual(fakePost.phoneNumber);
          expect(res.body.ad).toEqual(fakePost.ad);
          expect(res.body.address).toEqual(fakePost.address);
          expect(res.body._id).toExist();
          expect(res.body.user).toExist();
        });
    });
    it('should PUT with no ID and return 404', () => {
      let fakePost = {
        phoneNumber: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        ad: faker.hacker.phrase(),
      };
      mockPosts.one()
        .then((post) => {
          return superagent.put(`${API_URL}/api/posts/3`)
            .send(fakePost);
        })
        .catch((res) => {
          expect(res.status).toEqual(404);
        });
    });
    it('should PUT with invalid body and return 400', () => {
      let tempPost;
      mockPosts.one()
        .then((post) => {
          tempPost = post;
          return superagent.put(`${API_URL}/api/posts/${tempPost._id}`)
            .send({});
        })
        .catch((res) => {
          expect(res.status).toEqual(400);
        });
    });
  });

  describe('testing DELETE at /api/posts/:id', () => {
    it('should properly DELETE and return a 204', () => {
      let tempPost;
      mockPosts.one()
        .then((post) => {
          tempPost = post;
          return superagent.delete(`${API_URL}/api/posts/${tempPost._id}`);
        })
        .then((res) => {
          expect(res.status).toEqual(204);
        });
    });
    it('should DELETE with bad ID and return a 404', () => {
      mockPosts.one()
        .then((post) => {
          return superagent.delete(`${API_URL}/api/posts/3`);
        })
        .catch((res) => {
          expect(res.status).toEqual(404);
        });
    });
  });
});
