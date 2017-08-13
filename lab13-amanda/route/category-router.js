'use strict';

const jsonParser = require('body-parser').json();
const categoryRouter = module.exports = new require('express').Router();

const Category= require('../model/category.js');

categoryRouter.post('/api/categorys', jsonParser, (req, res, next) => {
  console.log('hit POST /api/categorys');

  new Category(req.body)
  .save()
  .then(category=> res.json(category))
  .catch(next);
});

categoryRouter.get('/api/categorys/:id', (req, res, next) => {
  console.log('hit /api/categorys/:id');

  Category.findById(req.params.id)
  .then(category=> res.json(category))
  .catch(next);
});

categoryRouter.put('/api/categorys/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/categorys/:id');
  let options = {
    runValidators: true,
    new: true,
  };
  let checkLength = Object.keys(req.body);
  if (checkLength.length === 0) {
    return res.sendStatus(400);
  }
  Category.findByIdAndUpdate(req.params.id, req.body, options)
.then(category => res.json(category))
.catch(next);

  categoryRouter.delete('/api/categorys/:id', jsonParser, (req, res, next) => {
    console.log('DELETE /api/categorys/:id');
    Category.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
  });
});
