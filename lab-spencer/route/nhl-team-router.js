'use strict';

const jsonParser = require('body-parser').json();
const Team = require('../model/nhl-team.js');

const teamRouter = module.exports = require('express').Router;

teamRouter.post('/api/nhl/teams', jsonParser, (req, res, next) => {
  new Team(req.body)
    .save()
    .then(team => res.json(team))
    .catch(next);
});

teamRouter.get('/api/nhl/teams/:id', (req, res, next) => {
  Team.findById(req.params.id)
    .then(team => res.json(team))
    .catch(next);
});

teamRouter.put('/api/nhl/teams/:id', jsonParser, (req, res, next) => {
  Team.findByIdAndUpdate(req.params.id, req.body)
    .then(team => res.json(team))
    .catch(next);
});

teamRouter.delete('/api/nhl/teams/:id', (req, res, next) => {
  Team.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
