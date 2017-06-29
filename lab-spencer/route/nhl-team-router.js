'use strict';

const jsonParser = require('body-parser').json();
const teamRouter = module.exports = new require('express').Router();

const Team = require('../model/nhl-team.js');

teamRouter.post('/api/nhl/teams', jsonParser, (req, res, next) => {
  new Team(req.body)
    .save()
    .then(team => res.json(team))
    .catch(next);
});

teamRouter.get('/api/nhl/teams', (req, res, next) => {
  let pageNum = 1;
  let numPer = 50;
  pageNum--;
  Team.find({})
    .sort({name: 'asc'})
    .skip(pageNum * numPer)
    .limit(numPer)
    .then(teams => res.json(teams))
    .catch(next);
});

teamRouter.get('/api/nhl/teams/:id', (req, res, next) => {
  Team.findById(req.params.id)
    // .populate('players')
    .then(team => res.json(team))
    .catch(next);
});

teamRouter.put('/api/nhl/teams/:id', jsonParser, (req, res, next) => {
  Team.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
});

teamRouter.delete('/api/nhl/teams/:id', (req, res, next) => {
  Team.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
