'use strict';

const jsonParser = require('body-parser').json();
const postRouter = module.exports = new require('express').Router();

const Post = require('../model/post.js');

postRouter.post('/api/posts', jsonParser, (req, res, next) => {
  console.log('hittin POST /api/posts, yall');
  new Post(req.body)
    .save()
    .then(post => res.json(post))
    .catch(next);

});

postRouter.get('/api/posts/:id', (req, res, next) => {
  console.log('hittin GET /api/posts/:id, yall');

  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(next);
});

postRouter.get('/api/posts', (req, res, next) => {
  console.log('hittin pagenation /api/posts, yall');

  let archivedPageNumber = Number(req.query.page);
  if(!archivedPageNumber || archivedPageNumber < 1) archivedPageNumber = 1;
  archivedPageNumber --;

  Post.find({})
    .sort({title: 'asc'})
    .skip(archivedPageNumber * 20)
    .limit(20)
    .then(posts => res.json(posts))
    .catch(next);
});

postRouter.put('/api/posts/:id', jsonParser, (req, res, next) => {
  console.log('hittin PUT /api/posts/:id, yall');

  let options = {
    runValidators: true,
    new: true,
  };

  Post.findByIdAndUpdate(req.params.id, req.body, options)
    .then(post => res.json(post))
    .catch(next);
});

postRouter.delete('/api/posts/:id', (req, res, next) => {
  console.log('hittin DELETE /api/posts/:id, yall');

  Post.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
