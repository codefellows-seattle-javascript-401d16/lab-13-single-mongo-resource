'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Team = require('../model/team.js');
const teamRouter = module.exports = new Router();

teamRouter.post('/api/team', jsonParser, (req, res, next) => {
  new Team(req.body)
  .save()
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.get('/api/team/:id', (req, res, next) => {
  Team.findById(req.params.id)
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.put('/api/team/:id', jsonParser, (req, res, next) => {
  let options = {
    runValidators: true,
    new: true,
  };
  Team.findByIdAndUpdate(req.params.id, req.body, options)
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.delete('/api/team/:id', (req, res, next) => {
  Team.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
