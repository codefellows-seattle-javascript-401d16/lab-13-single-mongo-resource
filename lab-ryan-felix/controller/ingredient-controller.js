const DBError = require('../lib/db-error.js');
const Ingredient = require('../model/ingredient.js');
const ControllerFactory = require('./controller-factory.js');

module.exports = ControllerFactory(Ingredient, DBError, {
  sortOptions: { name: 'asc' },
  pageLength: 25,
});
