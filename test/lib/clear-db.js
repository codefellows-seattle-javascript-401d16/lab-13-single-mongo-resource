'use strict';

const place= require('../../model/place.js');

module.exports = () => {
  return Promise.all([
    place.remove({}),
  ]);
};
