'use strict';

// npm modules
const faker = require('faker');
// app modules
const mockShip = require('./mock-ship.js');
const Crew = require('../../model/crew.js');
const Ship = require('../../model/ship.js');

const mockCrew = module.exports = {};

mockCrew.createOne = () => {
  let result = {};
  return mockShip.createOne()
  .then(ship => {
    result.ship = ship;
    new Ship({
      content: faker.random.words(1),
      ship: ship._id.toString(),
    })
    .save();
  })
  .then(crew => {
    result.crew = crew;
    return result;
  });
};

mockCrew.createMany = (n) => {
  let result = {};
  return mockShip.createOne()
  .then(ship => {
    result.ship = ship;
    let crewSavePromises = new Array(n).fill(0)
    .map(() => new Crew({
      content: faker.random.words(10),
      ship: ship._id.toString(),
    }).save());
    return Promise.all(crewSavePromises);
  })
  .then(crews => {
    result.crews = crews;
    return result;
  });
};
