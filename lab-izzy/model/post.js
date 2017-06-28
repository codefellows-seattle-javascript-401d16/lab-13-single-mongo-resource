'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true, unique: true},
  comments: {type: mongoose.Schema.Types.ObjectId, ref: 'comment'},
});

module.exports = mongoose.model('post', postSchema);
