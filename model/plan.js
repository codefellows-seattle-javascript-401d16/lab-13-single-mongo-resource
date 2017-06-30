'use strict';

const mongoose = require('mongoose');
const Trainer = require('./trainer.js');

const planSchema = mongoose.Schema( {
  fitness: {type: String, required: true},
  diet: {type: String, require: true},
  trainer: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'trainer'},
});


planSchema.pre('save', function(next) {
  Trainer.findById(this.trainer)
  .then(trainer => {
    let planIdSet = new Set(trainer.plans);
    planIdSet.add(this._id);
    console.log('id set', planIdSet);
    trainer.plans = Array.from(planIdSet);
    console.log('testing', trainer.plans);
    return trainer.save();
  })
  .then(() => next())
  .catch(() => {
    next(new Error('List does not Exist!'));
  });
});

planSchema.post('remove', (doc, next) => {
  Trainer.findById(doc.trainer)
  .then(trainer => {
    trainer.plans = trainer.plans.filter(plan => plan._id != doc._id);
    return trainer.save();
  })
  .then(() =>  next())
  .catch(next);
});

module.exports = mongoose.model('plan', planSchema);
