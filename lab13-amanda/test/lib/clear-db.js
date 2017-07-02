'use strict';

const Issue = require('../../model/issue.js');

module.exports = () => {
  return Promise.all([
    Issue.remove({}),
  ]);
};
