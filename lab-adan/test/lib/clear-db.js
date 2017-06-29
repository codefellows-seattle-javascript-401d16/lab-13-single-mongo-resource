'use strict';

const Company = require('../../model/company.js');

module.exports = () => {
  return Promise.all([
    Company.remove({}),
  ]);
};
