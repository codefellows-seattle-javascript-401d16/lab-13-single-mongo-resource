'use strict';

const Beer = require('../../model/beers.js');

module.exports = () => {
  return Promise.all([
    Beer.remove({}),
  ]);
};
