'use strict';

const faker = require('faker');
const User = require('../../model/user.js');

const mockUser = module.exports = {};

mockUser.one = () => {
  return new User({
    name: faker.name.firstName(2),
    city: faker.address.city(),
    weight: faker.random.number(),
  })
    .save();
};

mockUser.many = (num) => {
  let mockUserArray = new Array(num)
    .fill(0).map(() => mockUser.one());
  return Promise.all(mockUserArray);
};
