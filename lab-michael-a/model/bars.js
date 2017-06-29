'use strict';

const mongoose = require('mongoose');

const barSchema = mongoose.Schema({
  name: {type:String, required: true, unique:true},
  bestDrink: {type:String, required: true},
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref:'task'}],
  address: {type:String, required: true},
});


module.exports = mongoose.model('bars',barSchema);
