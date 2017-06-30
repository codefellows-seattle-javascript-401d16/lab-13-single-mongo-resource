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
              title: 'hello world',
              author: 'Izabella Arya Baer',
              post: post._id.toString(),
            });
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body._id).toExist();
          expect(res.body.title).toEqual('hello world');
          expect(res.body.post).toEqual(tempPost._id.toString());
          tempComment = res.body;
          return Post.findById(tempPost._id);
        })
        .then(post => {
          expect(post.comments.length).toEqual(1);
          expect(post.comments[0].toString()).toEqual(tempComment._id.toString());
        });
    });

    it('should respond with a 400 for having a bad post ID', () => {
      return superagent.post(`${API_URL}/api/comments`)
        .send({
          title: 'hello world',
          author: 'Izabella A. Baer',
          post: '67538',
        })
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should respond with a 409', () => {
      return superagent.post(`${API_URL}/api/comments`)
        .send(tempComment)
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(409);
        });
    });
  });

  describe('testing PUT /api/comments/:id', () => {
    it('should respond with a 200 and the updated comment', () => {
      let tempPost, tempComment;
      return mockComment.createOne()
        .then(({post, comment}) => {
          tempComment = comment;
          tempPost = post;
          return superagent.put(`${API_URL}/api/comments/${tempComment._id.toString()}`)
            .send({title: 'hello world'});
        })
        .then(res => {
          expect(res.status).toEqual(200);
          expect(res.body.title).toEqual('hello world');
          expect(res.body._id).toEqual(tempComment._id);
          expect(res.body.post).toEqual(tempPost._id);
          return Post.findById(tempPost._id);
        })
        .then(post => {
          expect(post.comments.length).toEqual(1);
          expect(post.comments[0].toString()).toEqual(tempComment._id.toString());
        });
    });

    it('should respond with 400', () => {
      return mockComment.createOne()
        .then(({post, comment}) => {
          let tempComment = comment;
          let tempPost = post;
          return superagent.put(`${API_URL}/api/comments/${tempComment._id.toString()}`)
            .send({author: 'slugz'});
        })
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(400);
        });
    });

    it('should respond with a 404', () => {
      return mockComment.createOne()
        .then(({post, comment}) => {
          return superagent.put(`${API_URL}/api/comments/jumbaliyah/cornbread`)
            .send({title: 'Full Stack Unicorn'});
        })
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing GET /api/comments/:id', () => {
    it('should respond with a 200 and a comment', () => {
      let tempComment;
      return mockComment.createOne()
        .then(result => {
          tempComment = result.comment;
          return superagent.get(`${API_URL}/api/comments/${tempComment._id.toString()}`)
            .then(res => {
              expect(res.status).toEqual(200);
              expect(res.body._id).toExist();
              expect(res.body.title).toEqual(tempComment.title);
              expect(res.body.author).toEqual(tempComment.author);
              expect(res.body.post).toEqual(tempComment.post);
            });
        });
    });

    it('should respond with a 404', () => {
      return superagent.get(`${API_URL}/api/comments/slugz/kittens/goats/sloths`)
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });

  describe('testing DELETE /api/comments', () => {
    it('should respond with a 204', () => {
      let tempComment;
      return mockComment.createOne()
        .then(result => {
          tempComment = result.comment;
          return superagent.delete(`${API_URL}/api/comments/${tempComment._id.toString()}`)
            .then(res => {
              expect(res.status).toEqual(204);
            });
        });
    });

    it('should respond with a 404', () => {
      return superagent.delete(`${API_URL}/api/comments/i/love/goats`)
        .then(res => {
          throw res;
        })
        .catch(res => {
          expect(res.status).toEqual(404);
        });
    });
  });
});
