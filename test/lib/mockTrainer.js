'use strict';

const faker = require('faker');
const Trainer = require('../../model/trainer.js');

const mockTrainer = module.exports = {};

mockTrainer.createOne = () => {
  return new Trainer({
    name: faker.random.words(2),
  })
  .save();
};
