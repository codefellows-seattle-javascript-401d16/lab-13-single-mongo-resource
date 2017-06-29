'use strict';

const mongoose = require('mongoose');

// define a schema for your model
const companySchema = mongoose.Schema({
  name: {type:String, required: true},
  products: {type:String, required: true},
});

// export a model
module.exports = mongoose.model('company', companySchema);
