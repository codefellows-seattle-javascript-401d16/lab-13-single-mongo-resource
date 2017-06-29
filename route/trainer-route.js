'use strict';

const jsonParser = require('body-parser').json();
const trainerRouter = module.exports = new require('express').Router();

const Trainer = require('../model/trainer.js');

trainerRouter.post('/api/trainers', jsonParser, (req, res, next) => {
  new Trainer(req.body)
  .save()
  .then(trainer => res.json(trainer))
  .catch(next);
});

trainerRouter.get('/api/trainers/:id', (req, res, next) => {
  Trainer.findById(req.params.id)
  .then(trainer => res.json(trainer))
  .catch(next);
});

trainerRouter.put('/api/trainers/:id', jsonParser, (req, res, next) => {
  console.log('route', req.body);
  Trainer.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(trainer => res.json(trainer))
  .catch(next);
});

trainerRouter.delete('/api/trainers/:id', (req, res, next) => {
  Trainer.findByIdAndRemove(req.params.id)
  .then(res.sendStatus(204))
  .catch(next);
});
