'use strict';

const Bar = require('../../model/bars.js');

module.exports = () => {
  return Promise.all([
    Bar.remove({}),
  ]);
};
