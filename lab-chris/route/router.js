'use strict';

const jsonParser = require('body-parser').json();
const nationRouter = module.exports = new require('express').Router();

const Nation = require('../model/nation.js');

nationRouter.post('/api/nations', jsonParser, (req, res, next) => {
  console.log('hit POST /api/nations');
  new Nation(req.body)
  .save()
  .then(nation => res.json(nation))
  .catch(next);
});

nationRouter.get('/api/nations/:id', (req, res, next) => {
  console.log('hit GET /api/nations/:id');

  Nation.findById(req.params.id)
  //.populate('tasks')
  .then(nation => res.json(nation))
  .catch(next);
});


nationRouter.get('/api/nations', (req, res, next) => {
  console.log('hit /api/nations');

  let pageNumber = Number(req.query.page);
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  Nation.find({})
  .sort({title: 'asc'})
  .skip(pageNumber * 50)
  .limit(50)
  .then(nations => res.json(nations))
  .catch(next);
});
