'use strict';

const faker = require('faker');
const mockNation = require('./mock-nation.js');
const Team = require('../../model/team.js');


const mockTeam = module.exports = {};

mockTeam.createOne = () => {
  let result = {};
  return mockNation.createOne()
  .then(nation => {
    result.nation = nation;
    return new Team({
      nation: nation._id.toString(),
      name: faker.random.words(3),

    })
    .save();
  })
  .then(task => {
    result.task = task;
    return result;
  });
};

mockTeam.createMany = (n) => {
  let result = {};
  return mockNation.createOne()
  .then(nation => {
    result.nation = nation;
    let taskSavePromises = new Array(n).fill(0)
      .map(() => new Team({
        nation: nation._id.toString(),
        name: faker.random.words(3),
      }).save());
    return Promise.all(taskSavePromises);
  })
  .then(tasks => {
    result.tasks = tasks;
    return result;
  });
};
