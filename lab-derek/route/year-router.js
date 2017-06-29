'use strict';

//npm modules
const jsonParser = require('body-parser').json();
const yearRouter = module.exports = new require('express').Router();

//app modules
const Year = require('../model/year.js');



//module logic
yearRouter.post('/api/years', jsonParser, (req, res, next) => {
  console.log('hit POST /api/years');

  new Year(req.body)
  .save()
  .then(year => res.json(year))
  .catch(next);
});

yearRouter.get('/api/years/:id', (req, res, next) => {
  console.log('hit GET /api/years');
  let options = {
    runValidators: true,
    new: true,
  };

  Year.findById(req.params.id, req.body, options)
  .then(year => res.json(year))
  .catch(next);
});

yearRouter.put('/api/years/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/years/:id');
  console.log(req.body);
  Year.findByIdAndUpdate(req.params.id)
  .then(year => res.json(year))
  .catch(next);
});
