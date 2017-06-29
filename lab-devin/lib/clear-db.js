'use strict';

const Team = require('../model/team.js');


module.exports = () => {
  return Promise.all([
    Team.remove({}),
  ]);
};
