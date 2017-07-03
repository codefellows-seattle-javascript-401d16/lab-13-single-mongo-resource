'use strict';

const jsonParser = require('body-parser').json;
const stateRouter = module.exports = new require('express').Router();

const State = require('../model/state.js');

stateRouter.post('/api/states', jsonParser, (req, res, next) => {
  console.log('hit POST /api/states');
  new State(req.body)
  .save()
  .then(state => res.json(state))
  .catch(next);
});

stateRouter.put('/api/states/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/states/:id');
  let options = {
    new: true,
    runValidators: true,
  };
  State.findByIdAndUpdate(req.params.id, req.body, options)
.then(state => res.json(state))
.catch(next);
});

stateRouter.get('/api/states/:id', jsonParser, (req, res, next) => {
  console.log('hit GET /api/states/:id');
  State.findById(req.params.id)
.then(state => res.json(state))
.catch(next);
});

stateRouter.delete('/api/states/:id', jsonParser, (req, res, next) => {
  console.log('hit DELETE /api/states/:id');
  State.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
