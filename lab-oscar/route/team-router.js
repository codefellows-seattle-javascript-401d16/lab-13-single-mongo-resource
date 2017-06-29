'use strict';

const jsonParser = require('body-parser').json();
const teamRouter = module.exports = new require('express').Router();

const Team = require('../model/team.js');

//module logic
teamRouter.post('/api/teams', jsonParser, (req, res, next) => {
  new Team(req.body)
    .save()
    .then(team => res.json(team))
    .catch(next);
});

teamRouter.get('/api/teams/:id', (req, res, next) => {
  Team.findById(req.params.id)
  //.populate('teams');
    .then(team => res.json(team))
    .catch(next);
});

teamRouter.put('/api/teams/:id', jsonParser, (req, res, next) => {
  let options = {
    runValidators: true,
    new: true,
  };
  Team.findByIdAndUpdate(req.params.id, req.body, options)
    .then(team => res.json(team))
    .catch(next);
});

teamRouter.delete('/api/teams/:id', (req, res, next) => {
  Team.findByIdAndRemove(req.params.id)
    .then(()=> res.sendStatus(204))
    .catch(next);
});

teamRouter.get('/api/teams', (req, res, next) => {
  let pageNumber = Number(req.query.page);
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;
  Team.find({})
    .sort({name: 'asc'})
    .skip(pageNumber * 50)
    .limit(50)
    .then(teams => res.json(teams))
    .catch(next);
});

// listRouter.get('/api/lists', (req, res, next) => {
//   console.log('hit /api/lists')
//
//   let pageNumber = Number(req.query.page)
//   if(!pageNumber || pageNumber < 1) pageNumber = 1;
//   pageNumber--;
//
//   List.find({})
//   .sort({title: 'asc'})
//   .skip(pageNumber * 50)
//   .limit(50)
//   .then(lists => res.json(lists))
//   .catch(next)
// })
