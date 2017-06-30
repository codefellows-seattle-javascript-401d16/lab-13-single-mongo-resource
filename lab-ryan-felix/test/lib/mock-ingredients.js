const faker = require('faker');
const Ingredient = require('../../model/ingredient.js');

module.exports = (recipe) => {
  return {
    createOne() {
      return new Ingredient({
        name: `${faker.name.firstName()} ${Math.floor(Math.random() * 10000)}`,
        description: faker.lorem.sentence(),
        recipe: recipe._id,
      })
      .save()
      .then(ingredient => {
        return ingredient;
      });
    },

    createMany(count) {
      const mockIngredients = new Array(count)
        .fill(0)
        .map(() => this.createOne());
      return Promise.all(mockIngredients)
        .then(ingredients => {
          return ingredients;
        });
    },
  };
};
