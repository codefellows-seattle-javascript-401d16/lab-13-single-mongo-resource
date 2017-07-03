'use strict';

const jsonParser = require('body-parser').json();
const {Router} = require('express');

const Trail = require('../model/trail.js');


const trailRouter = module.exports = new Router();

trailRouter.post('/api/trails', jsonParser, (req, res, next) => {
  console.log('Hit POST /api/trails route');
  new Trail(req.body)
  .save()
  .then(trail => res.json(trail))
  .catch(next);
});

trailRouter.get('/api/trails/:id', (req, res, next) => {
  console.log('Hit GET /api/trails/:id route');

  Trail.findById(req.params.id)
  .then(trail => res.json(trail))
  .catch(next);
});

trailRouter.get('/api/trails', (req, res, next) => {
  console.log('Hit GET /api/trails route');

  Trail.find({})
  .sort({name: 'asc'})
  .limit(10)
  .then(trails => res.json(trails))
  .catch(next);
});

trailRouter.put('/api/trails/:id', jsonParser, (req, res, next) => {
  console.log('Hit PUT /api/trails/:id route');

  let keys = Object.keys(req.body);
  if (keys.length < 1 || typeof req.body.name !== 'string' || req.body.name.length < 1) {
    return res.sendStatus(400);
  }

  let options = {
    new: true,
    runValidators: true,
  };
  Trail.findByIdAndUpdate(req.params.id, req.body, options)
  .then(updatedTrail => {
    return res.json(updatedTrail);
  })
  .catch(next);
});


trailRouter.delete('/api/trails/:id', (req, res, next) => {
  console.log('Hit DELETE /api/trails/:id route');

  Trail.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
