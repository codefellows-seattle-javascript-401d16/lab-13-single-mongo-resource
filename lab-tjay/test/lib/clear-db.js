'use strict';

const Player = require('../../model/player.js');

module.exports = () => {
  return Promise.all([
    Player.remove({}),
  ]);
};
