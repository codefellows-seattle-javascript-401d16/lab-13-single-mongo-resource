'use strict';

//npm modules
const faker = require('faker');

//model
const Beer = require('../../model/beers.js');

//to create a mock beer
const mockBeer = module.exports = {};

mockBeer.createOne = () => {
  return new Beer({
    name: faker.lorem.words(2) + ' ale',
    type: faker.lorem.words(3),
  })
    .save();
};

mockBeer.createMany = (n) => {
  let mockBeerArray = new Array(n)
    .fill(0).map(() => mockBeer.createOne());
  return Promise.all(mockBeerArray);
};
