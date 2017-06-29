'use strict';

const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {type: String, required: true},
  author: {type: String, required: true, unique: true},
  posts: {type: mongoose.Schema.Types.ObjectId, ref: 'post'},
});

module.exports = mongoose.model('blog', blogSchema);
