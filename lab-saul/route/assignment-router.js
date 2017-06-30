'use strict';

const jsonParser = require('body-parser').json();
const assignmentRouter = module.exports = new require('express').Router()

const Assignment = require('../model/assignment-model.js');

assignmentRouter.post('/api/assignments', jsonParser, (req, res, next) =>{
  console.log('hit POST /api/assignments');

  new Assignment(req.body)
  .save()
  .then(assignment => res.json(assignment))
  .catch(next);
});

assignmentRouter.put('/api/assignments/:id', jsonParser, (req, res, next) =>{
  console.log('hit PUT /api/assignments/:id');

  let options = {
    new: true,
    runValidators: true,
  };

  Assignment.findByIdAndUpdate(req.params.id, req.body, options)
  .then(assignment = res.json(assignment))
  .catch(next);
});

assignmentRouter.get('/api/assignments/:id', (req, res, next) => {
  Assignment.find({})
  .then(assignments => res.json(assignments.map(assignment => assignment._id)))
  .catch(next);
});

assignmentRouter.get('/api/assignments/:id', (req, res, next) => {
  Assignment.findbyId(req.params.id)
  .then(assignment => res.json(assignment))
  .catch(next);
});



assignmentRouter.delete('/api/assignments/:id', (req, res, next) => {
  Assignment.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
