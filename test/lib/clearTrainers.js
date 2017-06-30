'use strict';

const Trainer = require('../../model/trainer.js');

module.exports = () => {
  return Promise.all([
    Trainer.remove({}),
  ]);
};
