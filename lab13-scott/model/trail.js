'use strict';

const mongoose = require('mongoose');
const Resort = require('./resort.js');

const trailSchema = mongoose.Schema({
  name: {type: String, required: true, min: 1},
  resort: {type: mongoose.Schema.Types.ObjectId, ref:'resort', required: true},
});

module.exports = mongoose.model('trail', trailSchema);

//start the hooks
//before saving the new trail, run this logic.
trailSchema.pre('save', function(next){
  console.log('Hit pre save trail model, this: ', this);
  Resort.findById(this.resort)
  .then(resort => {
    //create a new set of the trails property values on the resort object
    let setTrailIDToResort = new Set(resort.trails);
    //add the new trail id to the Set of resort trails.
    setTrailIDToResort.add(this._id);
    //assign the resort.trails to the newly created set.
    resort.trails = Array.from(setTrailIDToResort);
    //save the updated resort object
    return resort.save();
  })
  //if successful resolve the then block, else send error
  .then(() => next)
  .catch(() => next(new Error('Trail FAILED to create, parent Resort does not exist')));
});

//after saving the new trail and updated resort, run this logic
trailSchema.post('save', function(doc, next){
  console.log('Hit post save trail model, remove doc: ', doc);
  Resort.findById(doc.resort)
  .then(resort => {
    resort.trails.filter(trail => doc._id !== trail._id);
    return resort.save();
  })
  .then(() => next())
  .catch(next);
});
