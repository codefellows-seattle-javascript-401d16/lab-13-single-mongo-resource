'use strict';

const mongoose = require('mongoose');

const burgerJointSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  location: {type: String, required: true},
  burgers: [{type: mongoose.Schema.Types.ObjectId, ref: 'burger'}],
});

module.exports = mongoose.model('burgerJoint', burgerJointSchema);