'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true, unique: true},
  content: {type: String, required: true},
});

const Post = module.exports = mongoose.model('post', postSchema);
