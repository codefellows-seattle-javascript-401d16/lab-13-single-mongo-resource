'use strict';

const jsonParser = require('body-parser');
const{Router} = require('express');
const Team = require('../model/team.js');

const teamRouter = module.exports = new Router();

teamRouter.post('/api/teams', jsonParser, (req, res, next) => {
  new Team(req.body)
  .save()
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.get('/api/teams:id', (req, res, next) => {
  console.log('HIT GET /api/teams:id');

  Team.findById(req.params.id)
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.put('/api/teams:id', (req, res, next) => {
  let options = {
    new: true,
    runValidators: true,
  };
  Team.findByIdAndUpdate(req.params.id, req.body, options)
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.delete('/api/teams:id', (req, res, next) => {
  Team.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
