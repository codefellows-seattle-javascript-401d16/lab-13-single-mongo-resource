'use strict';

//npm modules
const faker = require('faker');

//model
const Beer = require('../../model/beers.js');

//to create a mock beer
const mockBeer = module.exports = {};

mockBeer.createOne = () => {
  return new Beer({
    name: faker.lorem.word() + 'ale',
    type: faker.random.words(3),
  })
    .save();
};

mockBeer.createMany = (n) => {
  let mockBeerArray = new Array(n)
    .fill(0).map(() => mockBeer.createOne());
  return Promise.all(mockBeerArray);
};
