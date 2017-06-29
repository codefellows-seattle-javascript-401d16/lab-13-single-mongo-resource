'use strict';

const Resort = require('../../model/resort.js');

module.exports = () => {
  return Promise.all([Resort.remove({})]);
};
