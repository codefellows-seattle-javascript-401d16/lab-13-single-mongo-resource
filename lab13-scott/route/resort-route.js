'use strict';

const jsonParser = require('body-parser').json();
//{Router} uses the router method on express like ('express').Router()
const {Router} = require('express');
const Resort = require('../model/resort.js');


const resortRouter = module.exports = new Router();

resortRouter.post('/api/resorts', jsonParser, (req, res, next) => {
  console.log('Hit POST route');
  new Resort(req.body)
  .save()
  .then(newResort => res.json(newResort))
  .catch(next);
});
