const expect = require('expect');
const mongoose = require('mongoose');

const Ingredient = require('../model/ingredient.js');

describe('ingredient model', () => {

  it('should construct an ingredient with valid data fields (disregarding recipe id)', () => {
    const testIngredientInput = {
      name: 'Bread',
      description: 'delicious and nutritious',
      recipe: mongoose.Types.ObjectId(),
    };
    const testIngredient = new Ingredient(testIngredientInput);

    expect(testIngredient.validateSync()).toNotExist();
    expect(testIngredient.name).toEqual(testIngredientInput.name);
    expect(testIngredient.description).toEqual(testIngredientInput.description);
    expect(testIngredient.recipe).toExist();
  });

  it('should invalidate an ingredient with missing name', () => {
    const testIngredient = new Ingredient({
      description: 'huh?',
      recipe: mongoose.Types.ObjectId(),
    });

    const validation = testIngredient.validateSync();
    expect(validation.errors['name']).toExist();
  });

  it('should invalidate an ingredient with missing recipe id', () => {
    const testIngredient = new Ingredient({
      name: 'corn',
      description: 'yellow',
    });

    const validation = testIngredient.validateSync();
    expect(validation.errors['recipe']).toExist();
  });

});
