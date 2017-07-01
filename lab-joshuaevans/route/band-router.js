'use strict';

const jsonParser = require('body-parser').json();
const Band = require('../model/band.js');


let bandRouter = module.exports = require('express').Router();

bandRouter.post('/api/bands', jsonParser, (req, res, next) => {

  new Band(req.body)
  .save()
  .then(band => res.json(band))
  .catch(next);
});

bandRouter.get('/api/bands/:id', (req, res, next) => {

  Band.findById(req.params.id)
  .then(band => res.json(band))
  .catch(next);
});

bandRouter.get('/api/bands/', (req, res, next) => {

  Band.find({}, '_id').limit(5)
  .then(band => res.json(band))
  .catch(next);
});

bandRouter.put('/api/bands/:id', jsonParser, (req, res, next) => {

  Band.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(band => res.json(band))
  .catch(next);
});

bandRouter.delete('/api/bands/:id', (req, res, next) => {

  Band.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
