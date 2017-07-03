'use strict';

const faker = require('faker');
const mockBurgerJoints = require('./mock-burger-joints');
const Burger = require('../../model/burger.js');
const mockBurger = module.exports = {};

mockBurger.createBurger = function (n) {
  let result = {};

  return mockBurgerJoints.createBurgerJoints(1)
    .then(burgerJoint => {
      result.burgerJoint = burgerJoint;
      let mockBurgerArray = new Array(n)
        .fill(0)
        .map(() => new Burger({
          name: `${faker.random.words()} Burger`,
          burgerJoint: burgerJoint[0]._id.toString(),
          stars: Math.floor(Math.random()*10),
          flavors: [faker.random.word(),faker.random.word(),faker.random.word()],
        }).save());
      return Promise.all(mockBurgerArray);
    })
    .then(burgers =>{
      result.burgers = burgers;
      return result;
    });

};
