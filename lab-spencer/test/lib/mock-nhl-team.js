'use strict';

const faker = require('faker');
const Team = require('../../model/nhl-team.js');

let mockTeam = module.exports = {};

mockTeam.createOne = () => {
  return new Team({
    name: faker.company.companyName(),
    city: faker.address.city(),
    state: faker.address.state(),
    wins: faker.random.number(),
    losses: faker.random.number(),
    ties: faker.random.number(),
  })
  .save();
};

mockTeam.createMany = n => {
  return Promise.all(
    new Array(n)
      .fill(0)
      .map(() => mockTeam.createOne())
  );
};
