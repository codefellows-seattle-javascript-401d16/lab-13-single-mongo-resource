'use strict';

const List = require('../../model/photo-album.js');

module.exports = () => {
  return Promise.all([List.remove({})]);
};
