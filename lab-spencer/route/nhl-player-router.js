'use strict';

const jsonParser = require('body-parser').json();
const playerRouter = module.exports = new require('express').Router();

const Player = require('../model/nhl-player.js');

playerRouter.post('/api/nhl/players', jsonParser, (req, res, next) => {
  new Player(req.body)
    .save()
    .then(player => res.json(player))
    .catch(next);
});

playerRouter.get('/api/nhl/players/:id', (req, res, next) => {
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(next);
});

playerRouter.put('/api/nhl/players/:id', jsonParser, (req, res, next) => {
  let options = {
    new: true,
    runValidators: true,
  };
  Player.findByIdAndUpdate(req.params.id, req.body, options)
    .then(player => res.json(player))
    .catch(next);
});

playerRouter.delete('/api/nhl/players/:id', (req, res, next) => {
  Player.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
