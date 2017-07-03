'use strict';

const BurgerJoint = require('../model/burger-joint.js');
const Router = module.exports = require('express').Router();
const bodyParser = require('body-parser').json();

Router.post('/api/burger-joint', bodyParser, (req, res, next) => {
  new BurgerJoint(req.body)
    .save()
    .then(burger => res.json(burger))
    .catch(next);
});

Router.get('/api/burger-joint/:id', bodyParser, (req, res, next) => {
  BurgerJoint.findById(req.params.id)
    .then(burger => res.json(burger))
    .catch(next);
});

Router.put('/api/burger-joint/:id', bodyParser, (req, res, next) => {
  let options = {
    runValidators: true,
    new: true,
  };
  BurgerJoint.findByIdAndUpdate(req.params.id, req.body, options)
    .then(burger => res.json(burger))
    .catch(next);
});

Router.delete('/api/burger-joint/:id',bodyParser, (req, res, next) => {
  BurgerJoint.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});