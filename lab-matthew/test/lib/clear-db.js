'use strict';

const Ship = require('../../model/ship.js');

module.exports = () => {
  return Promise.all([
    Ship.remove({}),
  ]);
};
