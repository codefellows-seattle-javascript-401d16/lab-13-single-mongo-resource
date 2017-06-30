'use strict';

const faker = require('faker');
const mockResort = require('./mock-resort.js');
const Trail = require('../../model/trail.js');
const mockTrail = module.exports = {};

mockTrail.createOne = () => {
  let result = {};
  return mockResort.createOne()
  .then(resort => {
    result.resort = resort;
    return new Trail({
      name: faker.company.bs,
      resort: result.resort._id,
    })
    .save();
  })
  .then(trail => {
    result.trail = trail;
    return result;
  });
};

mockTrail.createMultiple = () => {

};
