'use strict';

const mongoose = require('mongoose');
const Loc = require('./loc.js');

const sevSchema = mongoose.Schema({
  content: {type: String, required: true},
  loc: {type: mongoose.Schema.Types.objectId, required: true, ref :'loc'},
});

sevSchema.pre('save', function(next) {
  console.log('pre save doc', this);
  Loc.findById(this.loc)
  .then(loc => {
    let sevIDSet = new Set(loc.sevs);
    sevIDSet.add(this._id);
    loc.sevs = Array.from(sevIDSet);
    return loc.save();
  })
.then(() => next())
.catch(() =>
  next(new Error('validation failed to create task because list does not exist')));
});

sevSchema.post('remove', function(doc, next){
  console.log('post remove doc', doc);
  Loc.findById(doc.list)
  .then(loc => {
    loc.sevs = loc.sevs.filter(sev => sev._id !==doc._id);
    return loc.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('sev', sevSchema);
