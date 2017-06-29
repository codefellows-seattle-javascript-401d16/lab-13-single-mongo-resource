'use strict';

const mongoose = require('mongoose');
const Year = require('./year.js');

let daySchema = mongoose.Schema({
  dayOfWeek: {type: 'String', required: true, match: /sun/||/mon/||/tue/||/wed/||/thu/||/fri/||/sat/},
  year: {type: mongoose.Schema.Type.ObjectId, required: true, ref: 'year'},
  dayOfYear: {type: Number, required: true, min: 0, max: 366},
});

daySchema.pre('save', function(next) {
  console.log('pre save doc', this);
  Year.findById(this.year)
  .then(year => {
    let dayIDSet = new Set(year.days);
    dayIDSet.add(this._id);
    year.days = Array.from(dayIDSet);
    return year.save();
  })
  .then(() => next())
  .catch(() => {
    next(new Error('failed to create a new day because year does not exist'));
  });
});

daySchema.post('save', function(doc, next) {
  console.log('post remove doc', doc);
  Year.findById(doc.year)
  .then(year => {
    year.days = year.days.filter(day => day._id !== doc._id);
    return year.save();
  })
  .then(() => next())
  .catch(next);
});
