'use strict';

const faker = require('faker');
const Team = require('../../model/nhl-team.js');

let mockTeam = module.exports = {};

mockTeam.createOne = () => {
  return new Team({
    name: faker.commerce.productName(),
    city: faker.address.city(),
    state: faker.address.state(),
    wins: faker.random.number(37),
    losses: faker.random.number(37),
    ties: faker.random.number(8),
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
