'use strict';

const mongoose = require('mongoose');
const BurgerJoint = require('./burger-joint');
const burgerSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  burgerJoint: {type: mongoose.Schema.Types.ObjectId, require:true, ref: 'burgerJoint'},
  stars: {type: Number, required: true},
  flavors: [{type: String, required:false}],
});

burgerSchema.pre('save', function(next) {
  BurgerJoint.findById(this.burgerJoint)
    .then(burgerJoint =>{
      let burgersSet = new Set(burgerJoint.burgers);
      burgersSet.add(this._id);
      burgerJoint.burgers = Array.from(burgersSet);
      return burgerJoint.save();
    })
    .then(()=>next())
    .catch(() => next(new Error('validation failed to create burger because burger joint does not exist')));
});

burgerSchema.post('delete', function(next){
  BurgerJoint.findById(this.burgerJoint)
    .then(burgerJoint =>{
      let burgersSet = new Set(burgerJoint.burgers);
      burgersSet.delete(this._id);
      burgerJoint.burgers = Array.from(burgersSet);
      return burgerJoint.save();
    })
    .then(() => next())
    .catch(next);
});

module.exports = mongoose.model('burger', burgerSchema);