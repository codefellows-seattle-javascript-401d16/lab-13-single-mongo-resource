'use strict'

const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  expenses: [{type: mongoose.Schema.Types.ObjectId, ref: 'expense'}],
})

module.exports = mongoose.model('category', categorySchema)
