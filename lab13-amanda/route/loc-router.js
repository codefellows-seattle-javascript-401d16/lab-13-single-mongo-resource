'use strict';

const jsonParser = require('body-parser').json();
const locRouter = module.exports = new require('express').Router();

const Loc = require('../model/loc.js');

locRouter.post('/api/locs', jsonParser, (req, res, next) => {
  console.log('hit POST /api/locs');

  new Loc(req.body)
  .save()
  .then(loc => res.json(loc))
  .catch(next);
});

locRouter.get('/api/locs/:id', (req, res, next) => {
  console.log('hit /api/locs');

  Loc.findById(req.params.id)
  .then(loc => res.json(loc))
  .catch(next);
});

locRouter.put('/api/locs/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/locs/:id', req.params.id);
  let options = {
    runValidators: true,
    new: true,
  };
  let checkLength = Object.keys(req.body);
  if (checkLength.length === 0) {
    return res.sendStatus(400);
  }
  console.log('req body', req.body);
  Loc.findByIdAndUpdate(req.params.id, req.body, options)
.then(loc => res.json(loc))
.catch(next);

  locRouter.delete('/api/locs/:id',  jsonParser, (req, res, next) => {
    console.log('DELETE /api/locs/:id');

    Loc.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
  });
});
