'use strict';

const faker = require('faker');
const Team = require('../../model/team.js');

const mockTeam = module.exports = {};

mockTeam.createOne = () => {
  return new Team({
    name: faker.name.findName(),
    owner: faker.name.findName(),
    founded: faker.date.past(),
  })
    .save();
};

mockTeam.createMany = (n) => {
  let mockListArray = new Array(n).fill(0).map(() => mockTeam.createOne());
  return Promise.all(mockListArray);
};
