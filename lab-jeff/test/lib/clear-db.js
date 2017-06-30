'use strict';

const School = require('../../model/school.js');

module.exports = () => {
  return Promise.all([
    School.remove({}),
  ]);
};
