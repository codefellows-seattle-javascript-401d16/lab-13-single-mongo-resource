'use strict';

const faker = require('faker');

const mockTeam = require('./mock-team.js');
const Player = require('../../model/player.js');

const mockPlayer = module.exports = {};

mockPlayer.createOne = () => {
  let result = {};
  return mockTeam.createOne()
    .then(team => {
      result.team = team;
      return new Player({
        name: faker.name.findName(),
        age: faker.random.number(),
        pasition: faker.name.jobArea(),
        team: team._id.toString(),
      })
        .save();
    })
    .then(player => {
      result.player = player;
      return result;
    });
};

// mockTask.createMany = (n) => {
//   let result = {}
//   return mockList.createOne()
//   .then(list => {
//     result.list = list;
//     let taskSavePromises = new Array(n).fill(0)
//       .map(() => new Task({
//         content: faker.random.words(10),
//         list: list._id.toString(),
//       }).save())
//     return Promise.all(taskSavePromises)
//   })
//   .then(tasks => {
//     result.tasks = tasks
//     return result
//   })
// }
