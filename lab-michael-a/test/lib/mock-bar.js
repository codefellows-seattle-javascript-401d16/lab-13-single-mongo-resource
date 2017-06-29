'use strict';

const faker = require('faker');

const Bar = require('../../model/bars.js');

const mockBar = module.exports = {};

mockBar.createOne = () => {
  return new Bar({
    name: faker.name.title(),
    bestDrink: faker.address.streetAddress(),
    address: faker.address.streetAddress(),
  })
  .save();
};

mockBar.createMany = (n) => {
  let mockBarArray = new Array(n)
    .fill(0).map(() => mockBar.createOne());
  return Promise.all(mockBarArray);
};
