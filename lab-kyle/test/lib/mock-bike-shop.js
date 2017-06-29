'use strict';

const faker = require('faker');
const Bikeshop = require('../../model/bike-shop.js');

const mockBikeShop = module.exports = {};

mockBikeShop.createOne = () => {
  return new Bikeshop({
    name: faker.company.companyName(),
    location:  faker.address.streetName(),
  })
  .save();
};

mockBikeShop.createMany = (n) => {
  let mockShopArray = new Array(n)
  .fill(0).map(() => mockBikeShop.createOne());
  return Promise.all(mockShopArray);
};
