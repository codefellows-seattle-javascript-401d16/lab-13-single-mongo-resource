'use strict';

const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema( {
  schoolName: {type: String, required: true, unique: true},
  location: {type: String},
  student: [{type: mongoose.Schema.Types.ObjectId, ref: 'student'}],
});

const School = module.exports = mongoose.model('school', schoolSchema);
