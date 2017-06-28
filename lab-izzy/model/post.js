'use strict';

const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  author: {type: String, required: true},
  content: {type: String, required:true},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comment'}],
});

module.exports = mongoose.model('post', postSchema);
