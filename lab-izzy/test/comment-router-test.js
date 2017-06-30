'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});


const expect = require('expect');
const superagent = require('superagent');

const clearDB = require('./lib/clear-db');
const server = require('../lib/server.js');
const Post = require('../model/post.js');
const mockPost = require('./lib/mock-post.js');
const mockComment = require('./lib/mock-comment.js');

const API_URL = process.env.API_URL;

describe('testing /api/comments', () => {
  before(server.start);
  after(server.stop);
  after(clearDB);

  describe('testing POST /api/comments', () => {
    it('should create a comment', () => {
      let tempPost;
      let tempComment;
      return mockPost.createOne()
        .then(post => {
          tempPost = post;
          return superagent.post(`${API_URL}/api/comments`)
            .send({
              
            })
        })
    })
  })
})
