'use strict';

//npm modules
const beerRouter = module.exports = require('express').Router();
const jsonParser = require('body-parser').json();

//module imports
const Beer = require('../model/beers.js');

//module logic
beerRouter.post('/api/beers', jsonParser, (req, res, next) => {
  console.log('hit POST /api/beers');
  new Beer(req.body)
    .save()
    .then(beer => res.status(201).json(beer))
    .catch(next);
});

//routes
beerRouter.get('/api/beers/:id', (req, res, next) => {
  console.log('hit GET /api/beers/:id');

  Beer.findById(req.params.id)

    .then(beer => res.status(200).json(beer))
    .catch(next);
});

beerRouter.get('/api/beers', (req, res, next) => {
  console.log('hit /api/beers');

  let pageNumber = Number(req.query.page);
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  Beer.find({})
    .sort({title: 'asc'})
    .skip(pageNumber * 50)
    .limit(50)
    .then(beers => res.status(200).json(beers))
    .catch(next);
});

beerRouter.put('/api/beers/:id', jsonParser, (req, res, next) => {
  console.log('PUT /api/beers:id');

  if (Object.keys(req.body).length === 0) {
    Beer.findById(req.params.id)
      .then(beer => res.status(400).json(beer))
      .catch(next);
  }

  let options = {
    runValidator: true,
    new: true,
  };

  Beer.findByIdAndUpdate(req.params.id, req.body, options)
    .then(beer => res.status(202).json(beer))
    .catch(next);
});

beerRouter.delete('/api/beers/:id', (req, res, next) => {
  console.log('DELETE /api/beers/:id');
  Beer.findByIdAndRemove(req.params.id, req.body)
    .then(() => res.status(204).send('deleted record'))
    .catch(next);
});

//extra method to delete all records for the resource
beerRouter.delete('/api/beers', (req, res, next) => {
  console.log('DELETE api/beers');
  Beer.remove()
    .then(() => res.status(204).send('deleted all records for the resource'))
    .catch(next);
});
