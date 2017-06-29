'use strict';

const faker = require('faker');
const Year = require('../../model/year.js');

const mockYear = module.exports = {};

mockYear.createOne = () => {
  return new Year ({
    name: Math.floor(1400+Math.random()*50000),
    dayJan1: faker.date.weekday(),
  })
  .save();
};

mockYear.createMany = (n) => {
  let mockYearArray = new Array(n)
  .fill(0).map(() => mockYear.createOne());
  return Promise.all(mockYearArray);
};
