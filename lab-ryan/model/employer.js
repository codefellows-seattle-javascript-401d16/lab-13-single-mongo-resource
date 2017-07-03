'use strict';

const mongoose = require('mongoose');

const employerSchema = mongoose.Schema({
  company: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  employees: {type: mongoose.Schema.Types.ObjectId, ref: 'employee'},
});

module.exports = mongoose.model('employer', employerSchema);
