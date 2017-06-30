const expect = require('expect');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const ingredientController = require('../controller/ingredient-controller.js');
const Ingredient = require('../model/ingredient.js');
const Recipe = require('../model/recipe.js');

const NO_SUCH_ID = 777; // arbitrary

describe('ingredient controller', () => {

  let testRecipeId;

  before(() => {
    dotenv.config({ path: `${__dirname}/.env` });
    mongoose.Promise = Promise;
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.MONGODB_URI, err => {
        if(err) reject(err);
        Ingredient.remove({})
          .then(() => new Recipe({
            title: 'Glass of Water',
            author: 'Rose',
            text: '1: Pour a glass of water. 2. Drink the water.',
          })
          .save()
          .then(recipe => testRecipeId = recipe._id)
          .then(() => resolve())
        );
      });
    });
  });

  after(done => {
    mongoose.disconnect(err => {
      expect(err).toNotExist();
      done();
    });
  });

  const testIngredient = {
    name: 'water',
    description: 'refreshing',
  };
  let testIngredientId;

  it('should add a valid ingredient to the DB', () => {
    //need to do this after the before block!
    testIngredient.recipe = testRecipeId;

    return ingredientController.create(testIngredient)
      .then(ingredient => {
        testIngredientId = ingredient._id;
        expect(ingredient.name).toEqual(testIngredient.name);
        expect(ingredient.description).toEqual(testIngredient.description);
        expect(ingredient.recipe).toEqual(testIngredient.recipe);
      });
  });

  it('should reject and throw on an invalid ingredient', () => {
    return ingredientController.create({ inStock: false })
      .catch(err => expect(err.type).toEqual(err.types.VALIDATION));
  });

  it('should reject and throw on a duplicate ingredient', () => {
    return ingredientController.create(testIngredient)
      .catch(err => expect(err.type).toEqual(err.types.UNIQUENESS));
  });

  it('should read an ingredient from the DB', () => {
    return ingredientController.read(testIngredientId)
      .then(ingredient => {
        expect(ingredient.name).toEqual(testIngredient.name);
        expect(ingredient.description).toEqual(testIngredient.description);
        expect(ingredient.recipe).toEqual(testIngredient.recipe);
      });
  });

  it('should throw when reading an invalid ID', () => {
    return ingredientController.read(NO_SUCH_ID)
      .catch(err => expect(err.type).toEqual(err.types.NO_SUCH_ID));
  });

  it('should update given a valid ingredient update', () => {
    return ingredientController.update(testIngredientId, {
      description: 'very refreshing',
    }).then(ingredient => {
      expect(ingredient.name).toEqual(testIngredient.name);
      expect(ingredient.description).toEqual('very refreshing');
      expect(ingredient.recipe).toEqual(testIngredient.recipe);
    });
  });

  it('should reject and throw when updating a nonexistent id', () => {
    return ingredientController.update(NO_SUCH_ID, {
      description: 'super refreshing',
    }).catch(err => expect(err.type).toEqual(err.types.NO_SUCH_ID));
  });

  it('should destroy a valid recipe', () => {
    return ingredientController.destroy(testIngredientId)
      .then(ingredientController.read(testIngredientId))
      .catch(err => expect(err.type).toEqual(err.types.NO_SUCH_ID));
  });

  it('should throw when destroying a nonexistent id', () => {
    return ingredientController.destroy(NO_SUCH_ID)
      .catch(err => expect(err.type).toEqual(err.types.NO_SUCH_ID));
  });

});
