'use strict';

const jsonParser = require('body-parser').json();
//{Router} uses the router method on express like ('express').Router()
const {Router} = require('express');
const Resort = require('../model/resort.js');


const resortRouter = module.exports = new Router();

resortRouter.post('/api/resorts', jsonParser, (req, res, next) => {
  console.log('Hit POST route');
  new Resort(req.body)
  .save()
  .then(newResort => res.json(newResort))
  .catch(next);
});

resortRouter.get('/api/resorts/:id', (req, res, next) => {
  console.log('Hit GET /api/resorts/:id route');
  Resort.findById(req.params.id)
  .then(resort => res.json(resort))
  .catch(next);
});

resortRouter.get('/api/resorts', (req, res, next) => {
  console.log('Hit GET /api/resorts route');
  Resort.find({})
  .sort({name: 'asc'})
  .limit(15)
  .then(resorts => res.json(resorts))
  .catch(next);
});

resortRouter.put('/api/resorts/:id', jsonParser, (req, res, next) => {
  console.log('Hit PUT /api/resorts/:id route`');

  let options = {
    new: true,
    isValidators: true,
  };

  Resort.findByIdAndUpdate(req.params.id, req.body, options)
  .then(updatedResort => res.json(updatedResort))
  .catch(next);
});

resortRouter.delete('/api/resorts/:id', (req, res, next) => {
  console.log('Hit DELETE /api/resorts/:id route');
  Resort.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
