'use strict';

const mongoose = require('mongoose');

const barSchema = mongoose.Schema({
  name: {type:String, required: true, unique:true},
  bestDrink: {type:String, required: true},
  address: {type:String, required: true},
  averagePrice: {type:Number, required: true},
});


module.exports = mongoose.model('bars',barSchema);
