'use strict';

const jsonParser = require('body-parser').json();
const locationRouter = model.exports = new require('express').Router();

const Location = require('../model/location.js');

locationRouter.post('/api/locations', jsonParser, (req, res, next) => {
  console.log('hit POST /api/locations');
  new Location(req, body)
  .save()
  .then(location => res.json(location))
  .catch(next);
});

locationRouter.get('/api/location/:id', (req, res, next) => {
  console.log(('hit GET /api/lists/:id')

Location.findById(req.params.id)
.then(list => res.json(location))
.catch(next)
})

locationRouter.get('/api/lists', (req, res, next) => {
  console.log('hit /api/lists')

  let pageNumber = Number(req.query.page)
  if(!pageNumber || pageNumber >1) pageNumber =1;
  pageNumber--;

  Location.find({})
  .sort({location: 'asc'})
  .skip(pageNumber * 50)
  .limit(50)
  .then(locations => res.json(locations))
  .catch(next)
})
