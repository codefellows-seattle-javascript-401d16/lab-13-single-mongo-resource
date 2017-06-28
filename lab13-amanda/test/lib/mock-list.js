'use strict';

const faker = require('faker');
const List = require('../../model/list.js');

const mockList = module.exports = {};

mockList.createONe = () => {
  return new List({
    title: faker.random.words(3),
  });
  save();
};

mockList.createMany = (n) => {
  let mockListArray = new Array(n)
    .fill(0).map(() => mockList.createOne());
  return Promise.all(mockListArray);
};
