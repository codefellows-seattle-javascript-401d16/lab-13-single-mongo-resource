'use strict';

const faker = require('faker');
const mockBikeShop = require('./mock-bike-shop.js');
const BikeShop = require('../../model/bike-shop.js');

const mockBike = module.exports = {};

mockBike.create = (n) => {
  let result = {};
  return mockBikeShop.createOne()
  .then(shop => {
    result.shop = shop;
    let bikePromises = new Array(n).fill(0)
      .map(() => new BikeShop({
        make: faker.random.noun(),
        model: faker.random.verb(),
      }).save());
    return Promise.all(bikePromises);
  })
  .then(bikes => {
    result.bikes = bikes;
    return result;
  });
};
