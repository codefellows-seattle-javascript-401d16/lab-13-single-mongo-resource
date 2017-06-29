const expect = require('expect');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const recipeController = require('../controller/recipe-controller.js');
const Recipe = require('../model/recipe.js');

const NO_SUCH_ID = 350; // arbitrary number

describe('recipe controller', () => {
  
  before(() => {
    dotenv.config({ path: `${__dirname}/.env`});
    mongoose.Promise = Promise;
    return new Promise((resolve, reject) => {
      mongoose.connect(process.env.MONGODB_URI, err => {
        if(err) reject(err);
        Recipe.remove({}).then(() => resolve());        
      });
    });
  });
  
  after(done => {
    mongoose.disconnect(err => {
      expect(err).toNotExist();
      done();
    });
  });
  
  const testRecipe = {
    title: 'Glass of Water',
    author: 'Rosa',
    text: '1. Pour a glass of water. 2. Drink the water.'
  };
  let testRecipeId;
  
  it('should add a valid recipe to the DB', () => {
    return recipeController.create(testRecipe)
      .then(recipe => {
        testRecipeId = recipe._id;
        expect(recipe.title).toEqual(testRecipe.title);
        expect(recipe.author).toEqual(testRecipe.author);
        expect(recipe.text).toEqual(testRecipe.text);
        expect(recipe.timestamp).toExist();
      });
  });
  
  it('should reject and throw on an invalid recipe', () => {
    return recipeController.create({ tasty: 'yes' })
      .catch(err => expect(err.type).toEqual(err.types.VALIDATION));
  });
  
  it('should reject and throw on a recipe with a duplicate title', () => {
    return recipeController.create({ title: 'Glass of Water', author: 'Roger', text: 'text' })
      .catch(err => expect(err.type).toEqual(err.types.UNIQUENESS));
  });
  
  it('should read a recipe from the DB', () => {
    return recipeController.read(testRecipeId)
      .then(recipe => {
        expect(recipe.title).toEqual(testRecipe.title);
        expect(recipe.author).toEqual(testRecipe.author);
        expect(recipe.text).toEqual(testRecipe.text);
        expect(recipe.timestamp).toExist();
      });
  });
  
  it('should throw when reading an invalid id', () => {
    return recipeController.read(NO_SUCH_ID)
      .catch(err => expect(err.type).toEqual(err.types.NO_SUCH_ID));
  });
  
  it('should update given a valid recipe update', () => {
    return recipeController.update(testRecipeId, {
      title: 'Refreshing Glass of Water',
    }).then(recipe => {
      expect(recipe.title).toEqual('Refreshing Glass of Water');
      expect(recipe.author).toEqual(testRecipe.author);
      expect(recipe.text).toEqual(testRecipe.text);
      expect(recipe.timestamp).toExist();
    });
  });
  
  it('should reject and throw when updating a nonexistent id', () => {
    return recipeController.update(NO_SUCH_ID, {
      title: 'Big Glass of Water',
    }).catch(err => expect(err.type).toEqual(err.types.NO_SUCH_ID));
  });
  
  it('should destroy a valid recipe', () => {
    return recipeController.destroy(testRecipeId)
      .then(recipeController.read(testRecipeId))
      .catch(err => expect(err.type).toEqual(err.types.NO_SUCH_ID));
  });
  
  it('should throw when destroying a nonexistent id', () => {
    return recipeController.destroy(NO_SUCH_ID)
      .catch(err => expect(err.type).toEqual(err.types.NO_SUCH_ID));
  });
  
});