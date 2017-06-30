'use strict';

const jsonParser = require('body-parser').json();

const teamRouter = module.exports = new require('express').Router();

const Team = require('../model/team.js');

teamRouter.post('/api/teams', jsonParser, (req, res, next) => {
  console.log('Hit Post');
  new Team(req.body)
  .save()
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.put('/api/teams/:id', jsonParser, (req, res, next) => {
  let options = {
    new: true,
    runValidators: true,
  };

  Team.findByIdAndUpdate(req.params.id, req.body, options)
  .then(team => res.json(team))
  .catch(next);
});

teamRouter.get('/api/teams/:id', (req, res, next) => {
  let pageNumber = Number(req.query.page);
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  Team.find({})
  .sort({nation: 'asc'})
  .skip(pageNumber * 50)
  .limit(50)
  .then(teams => res.json(teams))
  .catch(next);
});

teamRouter.delete('/api/teams/:id', (req, res, next) => {
  console.log('hit DELETE /api/teams/:id');

  Team.findByIdAndRemove(req.params.id)
  .then(() => res.send(`${req.params.id} deleted`))
  .catch(next);
});
