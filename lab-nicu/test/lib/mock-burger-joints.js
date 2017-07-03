'use strict';

const faker = require('faker');
const BurgerJoints = require('../../model/burger-joint.js');

const mockBurgerJoints = module.exports = {};

mockBurgerJoints.createBurgerJoints = function(n){
  let mockBurgerJointsArray = new Array(n)
    .fill(0)
    .map(() => new BurgerJoints({
      name: `${faker.random.words(3)}`,
      location: `${faker.address.city()}`,
    }).save());
  return Promise.all(mockBurgerJointsArray);
};
