'use strict';

const faker = require('faker');
const Car = require('../../model/car.js');


const mockCar = module.exports = {};

mockCar.createOne = () => {
  return new Car({
    make: faker.random.word(),
    model: faker.lorem.word(),
    year: faker.random.number(),
  })
  .save();
};

mockCar.createMany = (n) => {
  let mockCarArray = new Array(n)
    .fill(0).map(() => mockCar.createOne());
  return Promise.all(mockCarArray);
};
