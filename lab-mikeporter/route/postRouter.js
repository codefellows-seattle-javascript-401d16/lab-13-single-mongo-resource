'use strict';

const jsonParser = require('body-parser').json();
const postRouter = module.exports = new require('express').Router();

const Post = require('../model/post.js');

postRouter.post('/api/posts', jsonParser, (req, res, next) => {
  new Post(req.body)
    .save()
    .then((post) => res.json(post))
    .catch(next);
});

postRouter.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch(next);
});

postRouter.put('/api/posts/:id', (req, res, next) => {
  let keys = Object.keys(req.body);
  if (keys.length < 1) {
    return res.sendStatus(400);
  }
  let options = {
    new: true,
    runValidators: true,
  };
  Post.findByIdAndUpdate(req.params.id, req.body, options)
    .then((post) => res.json(post))
    .catch(next);
});

postRouter.delete('/api/posts/:id', (req, res, next) => {
  Post.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
