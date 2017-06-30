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
  Nation.findById(req.params.id)
  //.populate('tasks')
  .then(nation => res.json(nation))
  .catch(next);
});


nationRouter.get('/api/nations', (req, res, next) => {
  let pageNumber = Number(req.query.page);
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  Nation.find({})
  .sort({country: 'asc'})
  .skip(pageNumber * 50)
  .limit(50)
  .then(nations => res.json(nations))
  .catch(next);
});

nationRouter.put('/api/nations/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/nations/:id');
  let options = {
    new: true,
    runValidators: true,
  };

  Nation.findByIdAndUpdate(req.params.id, req.body, options)
  //.populate('tasks')
  .then(nation => res.json(nation))
  .catch(next);
});

nationRouter.delete('/api/nations/:id', (req, res, next) => {
  console.log('hit DELETE /api/nations/:id');

  Nation.findByIdAndRemove(req.params.id)
  //.populate('tasks')
  .then(() => res.send(`${req.params.id} deleted`))
  .catch(next);
});
