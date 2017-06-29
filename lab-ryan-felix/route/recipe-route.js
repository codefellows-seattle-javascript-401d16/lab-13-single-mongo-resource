'use strict';

const recipeRouter = new require('express').Router();
const jsonParser = require('body-parser').json();
const recipeController = require('../controller/recipe-controller.js');

recipeRouter.post('/api/recipes/', jsonParser, (req, res, next) => {
  recipeController.create(req.body)
    .then(recipe => res.status(201).json(recipe))
    .catch(err => next(err));
});

recipeRouter.get('/api/recipes/:id', (req, res, next) => {
  recipeController.read(req.params.id)
    .then(recipe => res.status(200).json(recipe))
    .catch(err => next(err));
});

recipeRouter.put('/api/recipes/:id', jsonParser, (req, res, next) => {
  recipeController.update(req.params.id, req.body)
    .then(recipe => res.status(202).json(recipe))
    .catch(err => next(err));
});

recipeRouter.delete('/api/recipes/:id', (req, res, next) => {
  recipeController.destroy(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => next(err));
});

recipeRouter.get('/api/recipes/', (req, res, next) => {
  recipeController.getPage(req.query.page)
    .then(recipes => res.status(200).json(recipes))
    .catch(err => next(err));
});

module.exports = recipeRouter;
