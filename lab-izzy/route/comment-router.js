'use strict';

const jsonParser = require('body-parser').json();
const commentRouter = module.exports = new require('express').Router();

const Comment = require('../model/comment.js');

commentRouter.post('/api/comments', jsonParser, (req, res, next) => {
  console.log('hittin POST /api/comments');

  new Comment(req.body)
    .save()
    .then(comment => res.json(comment))
    .catch(next);
});

commentRouter.put('/api/comments/:id', jsonParser, (req, res, next) => {
  console.log('hittin PUT /api/comments/:id');
  let options = {
    new: true,
    runValidators: true,
  };

  Comment.findByIdAndUpdate(req.params.id, req.body, options)
    .then(comment => res.json(comment))
    .catch(next);
});
