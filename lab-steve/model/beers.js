'use strict';

const mongoose = require('mongoose');

//define schema
const beerSchema = mongoose.Schema({
  name: {type:String, required: true, unique: true},
  type: {type:String, required: true},
  grain: {type:mongoose.Schema.Types.ObjectId, ref:'grain'},
  timeStamp: {type:Date, default: Date.now()},
});

//export a model
module.exports = mongoose.model('beer', beerSchema);
