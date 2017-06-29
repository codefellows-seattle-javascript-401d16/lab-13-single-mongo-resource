'use strict';

const Year = require('../../model/year.js');

module.exports = () => {
  return Promise.all([
    Year.remove({}),
  ]);
};
