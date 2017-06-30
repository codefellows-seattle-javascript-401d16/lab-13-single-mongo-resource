'use strict';

//npm modules
const jsonParser = require('body-parser').json();
const dayRouter = module.exports = new require('express').Router();

//app modules
const Day = require('../model/day.js');

//module logic
dayRouter.post('/api/days', jsonParser, (req, res, next) => {
  console.log('hit POST /api/days');

  new Day(req.body)
  .save()
  .then(day => res.json(day))
  .catch(next);
});

dayRouter.get('/api/days/:id', (req, res, next) => {
  console.log('hit GET /api/days/:id');
  Day.findById(req.params.id)
  .then(day => res.json(day))
  .catch(next);
});

dayRouter.put('/api/days/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/days/:id');
  let options = {
    runValidators: true,
    new: true,
  };

  Day.findByIdAndUpdate(req.params.id, req.body, options)
  .then(day => res.json(day))
  .catch(next);
});

dayRouter.delete('/api/days/:id', (req, res, next) => {
  console.log('hit DELETE /api/days/:id');
  Day.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
