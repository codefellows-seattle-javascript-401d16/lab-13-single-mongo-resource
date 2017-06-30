const expect = require('expect');

const Recipe = require('../model/recipe.js');

describe('recipe model', () => {
  it('should construct a recipe with valid fields', () => {
    const testRecipeInput = {
      title: 'Toast',
      author: 'Yancy',
      text: '1. Toast the bread. 2. Serve.',
    };
    const testRecipe = new Recipe(testRecipeInput);

    expect(testRecipe.validateSync()).toNotExist();
    expect(testRecipe.title).toEqual(testRecipeInput.title);
    expect(testRecipe.author).toEqual(testRecipeInput.author);
    expect(testRecipe.text).toEqual(testRecipeInput.text);
    expect(testRecipe._id).toExist();
  });

  it('should invalidate a recipe with missing title', () => {
    const testRecipe = new Recipe({
      author: 'Eugene',
      text: '1. Pour a shot of rum. 2. Drink the rum.',
    });

    const validation = testRecipe.validateSync();
    expect(validation.errors['title']).toExist();
  });

  it('should invalidate a recipe with missing author', () => {
    const testRecipe = new Recipe({
      title: 'Shot of rum',
      text: '1. Pour a shot of rum. 2. Drink the rum.',
    });

    const validation = testRecipe.validateSync();
    expect(validation.errors['author']).toExist();
  });
});
