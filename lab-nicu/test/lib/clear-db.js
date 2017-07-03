'use strict';

const BurgerJoints = require('../../model/burger-joint.js');
const Burger = require('../../model/burger.js');

module.exports = () => {
  return Promise.all([
    BurgerJoints.remove({}),
    Burger.remove({}),
  ]);
};