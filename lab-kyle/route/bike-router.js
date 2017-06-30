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

bikeRouter.get('/api/bikes/:?', (req, res, next) => {
  console.log('hit Get /api/bikes/:?');
  console.log('get req.params.id', req.params.id);

  Bike.findById(req.params.id)
  .then(bike => res.json(bike))
  .catch(next);
});

bikeRouter.put('/api/bikes/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/bikes/:id');
  let options = {
    new: true,
    runValidators: true,
  };

  Bike.findByIdAndUpdate(req.params.id, req.body, options)
  .then(task => res.json(task))
  .catch(next);
});

bikeRouter.delete('/api/bikeShops/:id', (req, res, next) => {
  Bike.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
