'use strict';

const jsonParser = require('body-parser').json();
const employerRouter = module.exports = new require('express').Router();

// app modules
const Employer = require('../model/employer.js');

// module logic
employerRouter.post('/api/employers', jsonParser, (req, res, next) => {
  console.log('hit POST /api/employers');
  new Employer(req.body)
  .save()
  .then(employer => res.json(employer))
  .catch(next);
});

employerRouter.get('/api/employers/:id', (req, res, next) => {
  console.log('hit GET /api/lists/:id');
  Employer.findById(req.params.id)
  .then(employer => res.json(employer))
  .catch(next);
});

employerRouter.get('/api/employers', (req, res, next) => {
  let pageNumber = Number(req.query.page);
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;
  Employer.find({})``
  .sort({name: 'asc'})
  .skip(pageNumber * 3)
  .limit(3)
  .then(employers => res.json(employers))
  .catch(next);
});

employerRouter.put('/api/employers/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/employers/:id');
  let options = {
    runValidators: true,
    new: true,
  };

  Employer.findByIdAndUpdate(req.params.id, req.body, options)
  .then(employer => res.json(employer))
  .catch(next);
});

employerRouter.delete('/api/employers/:id', (req, res, next) => {
  Employer.findByIdAndRemove(req.params.id)
.then(() => res.sendStatus(204))
.catch(next);
});
