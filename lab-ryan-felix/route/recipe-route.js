'use strict';

const recipeRouter = new require('express').Router();
const recipeController = require('../controller/recipe-controller.js');
const routeFactory = require('./route-factory.js');

module.exports = routeFactory(
  recipeRouter,
  recipeController,
  '/api/recipes/'
);
