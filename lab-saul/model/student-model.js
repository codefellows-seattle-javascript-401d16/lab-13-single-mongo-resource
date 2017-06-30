'use strict';

const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  studentId: {type: Number, required: true, unique: true},
  name: {type: String, required: true},
  class: {type: Number, required: true},
  grade: {type: Number, required: true},
  gender: {type: String, required: false},
  race: {type: String, required: false},
  assignments: [{type: mongoose.Schema.Types.ObjectId, res: assignment}],
});

module.exports = mongoose.model('student', studentSchema);
