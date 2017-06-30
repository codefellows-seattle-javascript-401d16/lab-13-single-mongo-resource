'use strict';

const mongoose = require('mongoose');
const Student = require('./student-model.js');

const assignmentSchema = mongoose.Schema({
  assignName: {type: String, required: true},
  possPoints: {type: String, required: true},
  student: {type: mongoose.Schema.Types.ObjectId, required: true},
});

assignmentSchema.pre('save',function(next) {
  console.log('pre save doc', this);
  Student.findById(this.student)
  .then(student => {
    let assignmentIDSet = new Set(student.assignments);
    assignmentIDSet.add(this._id);
    student.assignments = Array.from(assignmentIDSet);
    return student.save();
  })
  .then(() => next())
  .catch(() =>
    next(new Error('validation failed to create assignment because student does not exist')));
});


//keep?????
assignmentSchema.post('save', function(doc, next) {
  console.log('post save doc', doc);
  Student.findById(doc.student)
  .then(student => {
    student.assignments.push(doc._id);
    return student.save();
  })
  .then(() => next())
  .catch(next);
});


assignmentSchema.post('remove', function(doc, next) {
  console.log('post remove doc', doc);
  Student.findById(doc.student)
  .then(student => {
    student.assignment = student.assignment.filter(assignment => assignment._id !== doc._id);
    return student.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('assignment', assignmentSchema);
