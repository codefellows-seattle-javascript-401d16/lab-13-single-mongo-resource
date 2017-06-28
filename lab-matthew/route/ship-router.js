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
