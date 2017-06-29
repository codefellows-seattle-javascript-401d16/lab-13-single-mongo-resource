'use strict';

//npm modules
const jsonParser = require('body-parser').json();
const yearRouter = module.exports = new require('express').Router();

//app modules
const Year = require('../model/year.js');



//module logic
yearRouter.post('/api/years', jsonParser, (req, res, next) => {
  console.log('hit POST /api/years');

  new Year(req.body)
  .save()
  .then(year => res.json(year))
  .catch(next);
});

yearRouter.get('/api/years/:id', (req, res, next) => {
  console.log('hit GET /api/years');

  Year.findById(req.params.id)
  .then(year => res.json(year))
  .catch(next);
});

yearRouter.get('/api/years', (req, res, next) => {
  console.log('hit GET /api/years pagination');

  let pageNumber = Number(req.query.page);
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  Year.find({})
  .sort({name: 'asc'})
  .skip(pageNumber * 3)
  .limit(3)
  .then(years => res.json(years))
  .catch(next);
});

yearRouter.put('/api/years/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/years/:id');
  console.log(req.body);
  let options = {
    runValidators: true,
    new: true,
  };

  Year.findByIdAndUpdate(req.params.id, req.body, options)
  .then(year => res.json(year))
  .catch(next);
});

yearRouter.delete('/api/years/:id', (req, res, next) => {
  console.log('hit DELETE /api/years/:id');

  Year.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
