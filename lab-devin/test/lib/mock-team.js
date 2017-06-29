'use strict';

const Team = require('../../model/team.js');

const mockTeam = module.exports = {};

mockTeam.createOne = () => {
  return new Team({
    name: 'Punishers',
    country: 'USA',
  })
  .save();
};
