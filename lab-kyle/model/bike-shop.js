'use strict';

const mongoose = require('mongoose');

const bikeShopSchema = mongoose.Schema({
  name: {type: String, required: true},
  location: {type: String, required: true, unique: true},
  bikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'bike'}],
});

module.exports = mongoose.model('bikeShop', bikeShopSchema);
