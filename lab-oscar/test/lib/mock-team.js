'use strict';

const faker = require('faker');
const Team = require('../../model/team.js');

const mockTeam = module.exports = {};

mockTeam.createOne = () => {
  return new Team({
    name: faker.name.findName,
    owner: faker.name.findName,
    founded: faker.date.past,
  })
    .save();
};



// mockList.createOne = () => {
//   return new List({
//     title: faker.random.words(3),
//   })
//   .save()
// }
//
// mockList.createMany = (n) => {
//   let mockListArray = new Array(n)
//     .fill(0).map(() => mockList.createOne())
//   return Promise.all(mockListArray)
// }
