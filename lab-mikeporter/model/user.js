'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
  name: {type: String, required: true, unique: true},
  city: {type: String, required: true},
  weight: {type: Number, required: true},
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'post'}],
});

module.exports = mongoose.model('user', userSchema);
