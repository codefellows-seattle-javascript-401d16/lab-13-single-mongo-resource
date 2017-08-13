'use strict';

const jsonParser = require('body-parser').json();
const placeRouter = module.exports = new require('express').Router();

const Place= require('../model/place.js');

placeRouter.post('/api/places', jsonParser, (req, res, next) => {
  console.log('hit POST /api/places');

  new Place(req.body)
  .save()
  .then(place=> res.json(place))
  .catch(next);
});

placeRouter.get('/api/places/:id', (req, res, next) => {
  console.log('hit /api/places');

  Place.findById(req.params.id)
  .then(place=> res.json(place))
  .catch(next);
});

placeRouter.put('/api/places/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/places/:id');
  let options = {
    runValidators: true,
    new: true,
  };
  let checkLength = Object.keys(req.body);
  if (checkLength.length === 0) {
    return res.sendStatus(400);
  }
  Place.findByIdAndUpdate(req.params.id, req.body, options)
.then(place => res.json(place))
.catch(next);

  placeRouter.delete('/api/places/:id', jsonParser, (req, res, next) => {
    console.log('DELETE /api/places/:id');
    Place.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
  });
});
