'use strict';

const faker = require('faker');
const Ship = require('../../model/ship.js');

const mockShip = module.exports = {};

mockShip.createOne = () => {
  return new Ship({
    name: `${faker.company.bsAdjective(1)} ${faker.company.bsNoun(1)}`,
    type: mockShip.randomShipType(),
    captain: `${faker.name.firstName()} ${faker.name.lastName()}`,
  })
  .save();
};

mockShip.createMany = (n) => {
  let mockShipArray = new Array(n)
    .fill(0).map(() => mockShip.createOne());
  return Promise.all(mockShipArray);
};

mockShip.randomShipType = () => {
  let types = ['Schooner', 'Galleon', 'Treasure Galleon', 'Barque', 'Brigantine', 'Caravel', 'Carrack', 'Clipper', 'Corvette', 'Man of War'];

  return types[Math.floor(Math.random()*((types.length - 0) + 1)) + 0];
};
