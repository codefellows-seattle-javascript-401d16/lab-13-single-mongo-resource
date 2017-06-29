'use strict';

// npm modules
const faker = require('faker');
// app modules
const mockShip = require('./mock-ship.js');
const Crew = require('../../model/crew.js');

const mockCrew = module.exports = {};

mockCrew.createOne = () => {
  let result = {};
  return mockShip.createOne()
  .then(ship => {
    result.ship = ship;
    return new Crew({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      age: mockCrew.randomAge(),
      profession: mockCrew.randomProfession(),
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

mockCrew.randomProfession = () => {
  let professions = ['Poop-sweeper', 'Lookout', 'Cook', 'Stowaway', 'Cooper', 'Gunner', 'Deckhand', 'Mutineer', 'Navigator', 'Soldier'];

  return professions[Math.floor(Math.random()*((professions.length - 1)))];
};

mockCrew.randomAge = () => Math.floor(Math.random() * ((120 - 16)));
