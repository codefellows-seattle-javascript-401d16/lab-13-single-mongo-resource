'use strict';

const BikeShop = require('../../model/bike-shop.js');

module.exports = () => {
  return Promise.all([
    BikeShop.remove({}),
  ]);
};
