'use strict';

const Album = require('../../model/album.js');

module.exports = () => {
  return Promise.all([Album.remove({})]);
};
