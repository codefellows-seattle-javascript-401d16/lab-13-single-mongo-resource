'use strict';

// npm models
const Router = require('express').Router;
const jsonParser = require('body-parser').json();

// app models
const Car = require('../model/car.js');

// module logic
const carRouter = module.exports = new Router();

carRouter.post('/api/cars', jsonParser, (req, res, next) => {
  console.log('POST /api/cars');

  new Car(req.body)
  .save()
  .then(car => res.json(car))
  .catch(next);
});

carRouter.get('/api/cars/:id', (req, res, next) => {
  console.log('GET /api/cars/:id');
  Car.findById(req.params.id)
  .then(car => res.json(car))
  .catch(next);
});


carRouter.put('/api/cars/:id', jsonParser, (req, res, next) => {
  console.log('PUT /api/cars/:id');

  let options = {
    runValidators: true,
    new: true,
  };

  Car.findByIdAndUpdate(req.params.id, req.body, options)
  .then(car => res.json(car))
  .catch(next);
});


carRouter.delete('/api/cars/:id', (req, res, next) => {
  console.log('DELETE /api/cars/:id');

  Car.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
