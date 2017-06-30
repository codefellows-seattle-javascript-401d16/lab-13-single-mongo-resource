'use strict';

const mongoose = require('mongoose');
const Beer = require('./beer.js');


//define schema
const grainSchema = mongoose.Schema({
  name: {type:String, required: true, unique: true},
  beer: {type:mongoose.Schema.Types.ObjectId, ref: 'beer'},
  timeStamp: {type:Date, default: Date.now()},
});

//hooks
grainSchema.pre('save', function(next) {
  Beer.findById(this.beer)
    .then(() => next())
    .catch(() => next(new Error('failed to create grain becasue beer does not exist')));
});

grainSchema.post('save', function(doc, next) {
  Beer.findById(doc.beer)
    .then(beer => {
      beer.grain.push(doc._id);
      return beer.save();
    })
    .catch(next);
});

grainSchema.post('remove', function(doc, next) {
  Beer.findById(doc.beer)
    .then(beer => {
      beer.grain = beer.grain.filter(grain => grain._id !== doc._id);
      return beer.save();
    })
    .then(() => next())
    .catch(next);
});

//export a model
module.exports = mongoose.model('grain', grainSchema);
