'use strict';

const faker = require('faker');
const Team = require('./mock-nhl-team.js');
const Player = require('../../model/nhl-player.js');

const mockPlayer = module.exports = {};

mockPlayer.createOne = () => {
  let result = {};
  return Team.createOne()
    .then(team => {
      result.team = team;
      return new Player({
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        team: team._id.toString(),
        position: faker.random.alphaNumeric(2),
        injured: Math.round(Math.random()) === 0,
      })
      .save();
    })
    .then(player => {
      result.player = player;
      return result;
    });
};

mockPlayer.createMany = n => {
  let result = {};
  return Team.createOne()
    .then(team => {
      result.team = team;
      let playerSavePromises = new Array(n)
        .fill(0)
        .map(() => new Player({
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          team: team._id,
          position: faker.random.alphaNumeric(2),
          injured: Math.round(Math.random()) === 0,
        })
        .save());
      return Promise.all(playerSavePromises);
    })
    .then(players => {
      result.players = players;
      return result;
    });
};
