'use strict';

const mongoose = require('mongoose');
const Recipe = require('./recipe.js');

const ingredientSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'recipe',
  },
});


// FIXME: this works once then fails
ingredientSchema.pre('save', function(next) {
  console.log('saving an ingredient');
  console.log(this);
  Recipe.findById(this.recipe)
    .then(recipe => {
      console.log('pre save recipe id: ');
      console.log(recipe._id);
      if(!recipe.ingredients.includes(this._id))
        recipe.ingredients.push(this._id);
      // const uniqueIngredients = new Set(recipe.ingredients);
      // uniqueIngredients.add(this._id);
      // recipe.ingredients = Array.from(uniqueIngredients);
      // FIXME: I think this is changing the recipe's id so future ingredients can't find it???
      // FIXED!
      return recipe.save();
    })
    .then(() => next())
    .catch((err) => next(err));
});

ingredientSchema.post('remove', function(removedIngredient, next) {
  Recipe.findById(removedIngredient.recipe)
    .catch(() => next()) // recipe wasn't found - this should be fine, we can remove ingredients of removed recipes
    .then(recipe => {
      if(recipe) {
        recipe.ingredients = recipe.ingredients.filter(ingredient => ingredient._id !== removedIngredient._id);
        return recipe.save();
      } else {
        return null;
      }
    })
    .then(() => next())
    .catch((err) => next(err));
});

module.exports = mongoose.model('ingredient', ingredientSchema);
