'use strict';

const mongoose = require('mongoose');

// define a schema for your model
const companySchema = mongoose.Schema({
  companyName: {type:String, required: true},
  products: [{type: mongoose.Schema.Types.ObjectId, ref: 'products'}],
});

// export a model
module.exports = mongoose.model('company', companySchema);
