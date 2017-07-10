'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const BlueTeam = require('../model/blueTeam.js');
const RedTeam = require('../model/redTeam.js');

const teamRouter = module.exports = new Router();

teamRouter.post('/api/blueTeam', jsonParser, (req, res, next) => {
  console.log('POST /api/blueTeam');
  new BlueTeam(req.body)
    .save()
    .then(note => res.json(note))
    .catch(next);
});

teamRouter.get('/api/blueTeam/:id', (req, res, next) => {
  console.log('GET /api/blueTeam/:id');
  BlueTeam.findById(req.params.id)
    .then(blueTeam => res.json(blueTeam))
    .catch(next);
});

teamRouter.put('/api/blueTeam/:id', jsonParser, (req, res, next) => {
  console.log('POST /api/blueTeam/:id');
  let options = {
    runValidators: true,
    new: true,
  };
  BlueTeam.findByIdAndUpdate(req.params.id, req.body, options)
    .then(blueTeam => res.json(blueTeam))
    .catch(next);
});

teamRouter.delete('/api/blueTeam/:id', (req, res, next) => {
  console.log('DELETE /api/blueTeam/:id');
  BlueTeam.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
});
