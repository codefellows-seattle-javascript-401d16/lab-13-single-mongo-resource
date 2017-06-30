'use strict';

const jsonParser = require('body-parser').json();

const Bike = require('../model/bike.js');

const bikeRouter = module.exports = new require('express').Router();

bikeRouter.post('/api/bikes', jsonParser, (req, res, next) => {
  console.log('hit POST /api/bikes');

  new Bike(req.body)
  .save()
  .then(bike => res.json(bike))
  .catch(next);
});
