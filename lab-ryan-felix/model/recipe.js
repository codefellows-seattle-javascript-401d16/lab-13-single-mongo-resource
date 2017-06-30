'use strict';

const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  timestamp: { type: Date, default: Date.now() },
  text: { type: String },
  ingredients: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredient' }],
  },
});

module.exports = mongoose.model('recipe', recipeSchema);
