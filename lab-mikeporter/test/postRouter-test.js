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
  });
  // describe('', () => {
  //   it('', () => {
  //
  //   });
  // });
  // describe('', () => {
  //   it('', () => {
  //
  //   });
  // });
  // describe('', () => {
  //   it('', () => {
  //
  //   });
  // });
  // describe('', () => {
  //   it('', () => {
  //
  //   });
  // });
});
