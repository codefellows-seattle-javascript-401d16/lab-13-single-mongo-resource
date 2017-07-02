'use strict';

const faker = require('faker');
const loc = require('../../model/loc.js');
const mockloc = module.exports = {};

mockloc.createOne = () => {
  return new loc({
    title: faker.random.words(3),
  })
  .save();
};
