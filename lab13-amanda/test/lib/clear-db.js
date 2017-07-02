'use strict';

const loc = require('../../model/loc.js');

module.exports = () => {
  return Promise.all([
    loc.remove({}),
  ]);
};
