'use strict';

const faker = require('faker');
const place= require('../../model/place.js');
const mockplace= module.exports = {};

mockplace.createOne = () => {
  return new place({
    title: faker.random.words(3),
  })
  .save();
};
