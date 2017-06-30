'use strict';

const mongoose = require('mongoose');
const Year = require('./year.js');

const daySchema = mongoose.Schema({
  dayOfWeek: {type: 'String', required: true, match: /sun/||/mon/||/tue/||/wed/||/thu/||/fri/||/sat/},
  dayOfYear: {type: Number, required: true, min: 0, max: 366, unique: true},
  year: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'year'},
});

daySchema.pre('save', function(next) {
  // console.log('pre save doc', this);
  Year.findById(this.year)
  .then(year => {
    let dayIDSet = new Set(year.days);
    dayIDSet.add(this._id);
    year.days = Array.from(dayIDSet);
    return year.save();
  })
  .then(() => next())
  .catch(() => {
    next(new Error('duplicate key - already exists'));
  });
});

daySchema.post('remove', function(doc, next) {
  // console.log('post remove doc', doc);
  Year.findById(doc.year)
  .then(year => {
    year.days = year.days.filter(day => day._id !== doc._id);
    return year.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('day', daySchema);
