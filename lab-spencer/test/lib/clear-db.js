'use strict';

const Team = require('../../model/nhl-team.js');
// const Player = require('../../model/nhl-player.js');

module.exports = () => {
  return Promise.all([
    Team.remove({}),
    // Player.remove({}),
  ]);
};
