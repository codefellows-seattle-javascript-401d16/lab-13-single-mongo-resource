const mockRecipes = require('./mock-recipes.js');
const mockIngredients = require('./mock-ingredients.js');

const randInt = (int) => Math.floor(Math.random() * int + 1);

module.exports = (recipeCount) => {
  return mockRecipes.createMany(recipeCount)
    .then(recipes => {
      return Promise.all(recipes.map(recipe => mockIngredients(recipe).createMany(randInt(10))));
    });
};
