'use strict';

const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  make: {type:String, required:true, unique:true},
  model: {type:String, required:true, minlength: 2},
  year: {type:Number, required:true},
  drivers: [{type: mongoose.Schema.Types.ObjectId, ref: 'drivers'}],
});

module.exports = mongoose.model('car', carSchema);
