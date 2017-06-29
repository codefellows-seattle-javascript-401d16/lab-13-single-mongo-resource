'use strict';

const jsonParser = require('body-parser').json();
const crewRouter = module.exports = new require('express').Router();

//app modules
const Crew = require('../model/crew.js');

crewRouter.post('/api/crews', jsonParser, (req, res, next) => {
  console.log('hit POST /api/crews');

  new Crew(req.body)
  .save()
  .then(crew => res.json(crew))
  .catch(next);
});

crewRouter.put('/api/crews/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/crews/:id');
  let options = {
    new: true,
    runValidators: true,
  };
  Crew.findByIdAndUpdate(req.params.id, req.body, options)
  .then(crew => res.json(crew))
  .catch(next);
});

crewRouter.get('/api/crews/:id', (req, res, next) => {
  console.log('hit GET /api/crews/:id');
  Crew.findById(req.params.id)
  .then(crew => res.json(crew))
  .catch(next);
});

crewRouter.delete('/api/crews/:id', (req, res, next) => {
  console.log('hit DELETE /api/crews/:id');
  Crew.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
