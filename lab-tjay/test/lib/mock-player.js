'use strict';

const faker = require('faker');
const Player = require('../../model/player.js');


const mockPlayer = module.exports = {};

mockPlayer.createOne = () => {
  return new Player({
    playerName: faker.player,
  })
  .save();
};

mockPlayer.createMany = (n) => {
  let mockPlayerArray = new Array(n)
    .fill(0).map(() => mockPlayer.createOne());
  return Promise.all(mockPlayerArray);
};
