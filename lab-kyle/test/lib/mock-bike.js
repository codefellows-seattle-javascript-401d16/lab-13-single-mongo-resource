'use strict';

const faker = require('faker');
const Bike = require('../../model/bike.js');
const mockBikeShop = require('./mock-bike-shop.js');

const mockBike = module.exports = {};

mockBike.create = (n) => {
  let result = {};
  return mockBikeShop.createOne()
  .then(shop => {
    result.shop = shop;
    let bikePromises = new Array(n).fill(0)
      .map(() => new Bike({
        make: faker.hacker.noun(),
        model: faker.hacker.verb(),
        shop: shop._id,
      }).save());
    return Promise.all(bikePromises);
  })
  .then(bikes => {
    result.bikes = bikes;
    return result;
  });
};
