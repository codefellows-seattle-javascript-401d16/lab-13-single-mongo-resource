'use strict';

const faker = require('faker');
const Nation = require('../../model/nation.js');


const mockNation = module.exports = {};

mockNation.createOne = () => {
  return new Nation({
    title: faker.random.words(3),
  })
  .save();
};

mockNation.createMany = (n) => {
  let mockNationArray = new Array(n)
    .fill(0).map(() => mockNation.createOne());
  return Promise.all(mockNationArray);
};
