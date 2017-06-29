'use strict';

const Nation = require('../../model/nation.js');

module.exports = () => {
  return Promise.all([
    Nation.remove({}),
  ]);
};
