'use strict';

const jsonParser = require('body-parser').json();
const planRouter = module.exports = require('express').Router();

const Plan = require('../model/plan.js');

planRouter.post('/api/plans', jsonParser, (req, res, next) => {
  new Plan(req.body)
  .save()
  .then(plan => res.json(plan))
  .catch(next);
});

planRouter.get('/api/plans', (req, res, next) => {
  Plan.findById(req.params.id)
  .then(plan => res.json(plan))
  .catch(next);
});

planRouter.put('/api/plans', jsonParser, (req, res, next) => {
  let options = {
    new: true,
    runValidators: true,
  };
  Plan.findByIdAndUpdate(req.params.id, req.body, options)
  .then(plan => res.json(plan))
  .catch(next);
});

planRouter.delete('/api/plans', (req, res, next) => {
  Plan.findByIdAndRemove(req.params.id)
  .then(plan => res.json(plan))
  .catch(next);
});
