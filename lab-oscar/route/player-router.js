'use strict';

const jsonParser = require('body-parser').json();
const playerRouter = module.exports = new require('express').Router();

const Player = require('../model/player.js');

playerRouter.post('/api/players', jsonParser, (req, res, next) => {
  new Player(req.body)
    .save()
    .then(team => res.json(team))
    .catch(next);
});

playerRouter.get('/api/players/:id', (req, res, next) => {
  Player.findById(req.params.id)
    .then(team => res.json(team))
    .catch(next);

});

playerRouter.put('/api/players/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/players/:id');
  let options = {
    new: true,
    runValidators: true,
  };
  Player.findByIdAndUpdate(req.params.id, req.body, options)
    .then(player => res.json(player))
    .catch(next);
});
// taskRouter.put('/api/tasks/:id', jsonParser, (req, res, next) => {
//   console.log('hit PUT /api/tasks/:id')
//   let options = {
//     new: true,
//     runValidators: true,
//   }
//
//   Task.findByIdAndUpdate(req.params.id, req.body, options)
//   .then(task => res.json(task))
//   .catch(next)
// })
