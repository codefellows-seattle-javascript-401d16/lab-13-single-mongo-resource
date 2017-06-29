'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const Ship = require('../model/ship.js');

const shipRouter = module.exports = new Router();

shipRouter.post('/api/ships', jsonParser, (req, res, next) => {
  new Ship(req.body)
  .save()
  .then(ship => res.json(ship))
  .catch(next);
});

shipRouter.get('/api/ships:id', (req, res, next) => {
  console.log('hit GET /api/ships/:id');

  Ship.findById(req.params.id)
  .then(ship => res.json(ship))
  .catch(next);
});

shipRouter.put('/api/ships/:id', jsonParser, (req, res, next) => {
  console.log('PUT ROUTE', typeof req.body.name);
  Ship.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
  .then(ship => res.json(ship))
  .catch(next);
});
