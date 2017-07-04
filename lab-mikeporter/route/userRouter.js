'use strict';

const userRouter = module.exports = new require('express').Router();
const jsonParser = require('body-parser').json();
const User = require('../model/user.js');

userRouter.post('/api/users', jsonParser, (req, res, next) => {
  new User(req.body)
    .save()
    .then((user) => res.json(user))
    .catch(next);
});

userRouter.get('/api/users/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
});

userRouter.get('/api/users', (req, res, next) => {
  let pageNumber = Number(req.query.page);
  if(!pageNumber || pageNumber < 1)
    pageNumber = 1;
  pageNumber--;

  User.find({})
    .sort({name: 'asc'})
    .skip(pageNumber * 10)
    .limit(10)
    .then((users) => res.json(users))
    .catch(next);
});

userRouter.put('/api/users/:id', jsonParser, (req, res, next) => {
  let options = {
    new: true,
    runValidators: true,
  };
  User.findByIdAndUpdate(req.params.id, req.body, options)
    .then((user) => res.json(user))
    .catch(next);
});

userRouter.delete('/api/users/:id', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
