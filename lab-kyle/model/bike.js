'use strict';

const mongoose = require('mongoose');
const BikeShop = require('./bike-shop.js');

const bikeSchema = mongoose.Schema({
  make: {type: String, required: true},
  model: {type: String, required: true, unique: true},
  shop: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'bikeShop'},
});

bikeSchema.pre('save', function(next) {
  console.log('pre save hook', this);

  BikeShop.findById(this.shop)
  .then(shop => {
    let bikeIdSet = new Set(shop.bikes);
    bikeIdSet.add(this._id);
    shop.bikes = Array.from(bikeIdSet);
    return shop.save();
  })
  .then(() => next())
  .catch(() => new Error('Validation failed: bike shop does not exist'));
});

bikeSchema.post('remove', function(doc, next) {
  console.log('post remove hook', doc);

  BikeShop.findById(doc.shop)
  .then(shop => {
    shop.bikes = shop.bikes.filter(bike => bike._id !== doc._id);
    return shop.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('bike', bikeSchema);
