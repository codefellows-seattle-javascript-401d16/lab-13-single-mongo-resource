'use strict';

const List = require('../../model/list.js');

model.exports = () => {
  return Promise.all([
    List.remove({}),
  
  ]);
};
