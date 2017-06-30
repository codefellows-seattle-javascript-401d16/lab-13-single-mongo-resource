'use strict';

const Resort = require('../../model/resort.js');
const Trail = require('../../model/trail.js');

const clearDB = module.exports = {};

clearDB.resort = () => {
  return Promise.all([Resort.remove({})]);
};

clearDB.trail = () => {
  return Promise.all([Trail.remove({})]);
};
