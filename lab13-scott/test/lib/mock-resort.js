'use strict';

const faker = require('faker');
const Resort = require('../../model/resort.js');

const mockResort = module.exports = {};

mockResort.createOne = () => {
  return new Resort({
    name: `${faker.random.words(2)} Pass Resort`,
  })
  .save();
};

mockResort.createMultiple = (num) => {
  let mockResortArray = new Array(num).fill(0).map(() => mockResort.createOne());
  return Promise.all(mockResortArray);
};
