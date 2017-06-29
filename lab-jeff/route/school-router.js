'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Student = require('../model/school.js');

let schoolRouter = module.exports = new Router();

schoolRouter.post('/api/schools', jsonParser, (req, res, next) => {
  console.log('hit POST /api/schools');

  new Student(req.body)
  .save()
  .then(school => res.json(school))
  .catch(next);
});

schoolRouter.get('/api/schools/:id', (req, res, next) => {
  console.log('hit GET /api/schools/:id');
  Student.findById(req.params.id)
  .then(school => res.json(school))
  .catch(next);
});

schoolRouter.put('/api/schools/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/schools/:id');

  let options = {
    runValidators: true,
    new: true,
  };
  Student.findByIdAndUpdate(req.params.id, req.body, options)
  .then(school => res.json(school))
  .catch(next);
});

schoolRouter.delete('/api/schools/:id', (req, res, next) => {
  console.log('hit DELETE /api/schools/:id');
  Student.findByIdAndRemove(req.params.id)
  .then(() => res.send(204))
  .catch(next);
});
