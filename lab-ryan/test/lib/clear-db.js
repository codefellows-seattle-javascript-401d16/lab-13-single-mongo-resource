'use strict';

const Employer = require('../../model/employer.js');

module.exports = () => {
  return Promise.all([
    Employer.remove({}),
  ]);
};
