'use strict';

const mongoose = require('mongoose');
const Employer = require('./employer.js')

const employeeSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  employer: [{type: mongoose.Schema.Types.ObjectId, ref: 'employer'}],
  name: {type: String, required: true},
});

employeeSchema.pre('save', function(next){
  Employer.findById(this.employer)
  .then(employer => {
    let employeeIDSet = new Set(employer.employees);
    employeeIDSet.add(this._id);
    employer.employees = Array.from(employeeIDSet);
    return employer.save();
  })
  .then(() => next())
  .catch(() => next(new Error('Failed to create employee because employer does not exist.')));
});

employeeSchema.post('save', function(doc, next) {
  Employer.findById(doc.employer)
  .then(employer => {
    employer.employees = employer.employees.filter(employee => employee._id !== doc._id);
    return employer.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('employee', employeeSchema);
