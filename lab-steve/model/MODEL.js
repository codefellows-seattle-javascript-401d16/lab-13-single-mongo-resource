'use strict';

const mongoose = require('mongoose');

//define schema
const MODEL = mongoose.Schema({
  name: {type:String, required: true, unique: true},
  // name: {type:String, required: true},
  timeStamp: {type:Date, default: Date.now()},
});

//export a model
module.exports = mongoose.model('hop', MODEL);
