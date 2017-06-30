'use strict';

const faker = require('faker');
const Plan = require('../../model/plan.js');
const mockTrainer = require('./mockTrainer.js');

const mockPlan = module.exports = {};

mockPlan.createOne = () => {
  let result = {};
  return mockTrainer.createOne()
  .then(trainer => {
    result.trainer = trainer;
    return new Plan( {
      fitness: faker.random.words(5),
      diet: faker.random.words(5),
      trainer: trainer._id.toString(),
    })
    .save();
  })
  .then(plan => {
    result.plan = plan;
    return result;
  });
};
