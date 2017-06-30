const ingredientRouter = require('express').Router();
const ingredientController = require('../controller/ingredient-controller.js');
const routeFactory = require('./route-factory.js');

module.exports = routeFactory(
  ingredientRouter,
  ingredientController,
  '/api/ingredients/'
);
