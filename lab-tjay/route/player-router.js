
'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Player = require('../model/player.js');

let playerRouter = module.exports = new Router();

playerRouter.post('/api/player', jsonParser, (req, res, next) => {
  console.log('showing /api/player');
  new Player(req.body)
    .save()
    .then(player => res.json(player))
    .catch(next);
});
playerRouter.get('/api/player',(req, res, next) => {
  Player.find({})
    .then(player => res.json(player))
    .catch(next);

});
playerRouter.get('/api/player/:id', (req, res, next) => {
  console.log('hit get /api/player/:id');
  Player.findById(req.params.id)
    .then(player => res.json(player))
    .catch(next);
});
playerRouter.put('/api/player/:id', jsonParser, (req, res, next) => {
  Player.update({_id: req.params.id}, {playerName: req.body.playerName, products: req.body.products})
    .then(() => res.json(req.body))
    .catch(next);
});

playerRouter.delete('/api/player/:id', (req, res, next) => {
  Player.deleteOne({_id: req.params.id})
    .then(() => res.sendStatus(200))
    .catch(next);
});
