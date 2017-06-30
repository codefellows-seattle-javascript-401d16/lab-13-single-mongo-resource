const DBError = require('../lib/db-error.js');
const Recipe = require('../model/recipe.js');
const ControllerFactory = require('./controller-factory.js');

module.exports = ControllerFactory(Recipe, DBError, {
  sortOptions: { title: 'asc' },
  pageLength: 20,
});

//
// {
//   create(recipe) {
//     return new Recipe(recipe)
//       .save()
//       .catch(err => {
//         throw new DBError(err);
//       });
//   },
//   read(id) {
//     return Recipe.findById(id)
//       .catch(err => {
//         throw new DBError(err);
//       });
//   },
//   update(id, recipe) {
//     return Recipe.findByIdAndUpdate(id, recipe, { new: true })
//       .catch(err => {
//         throw new DBError(err);
//       });
//   },
//   destroy(id) {
//     return Recipe.findByIdAndRemove(id)
//       .catch(err => {
//         throw new DBError(err);
//       });
//   },
//   getPage(page) {
//     return Recipe.find({})
//       .sort({title: 'asc'})
//       .skip(Number(page) ? page - 1 : 0)
//       .limit(20);
//   },
// };
