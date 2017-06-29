'use strict';

const Car = require('../../model/car.js');

module.exports = () => {
  return Promise.all([
    Car.remove({}),
  ]);
};
