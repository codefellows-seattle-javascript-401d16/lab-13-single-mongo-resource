'use strict';

const BurgerJoints = require('../../model/burger-joint.js');


module.exports = () => {
  return Promise.all([
    BurgerJoints.remove({}),
  ]);
};