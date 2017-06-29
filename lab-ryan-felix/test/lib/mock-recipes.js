const faker = require('faker');
const Recipe = require('../../model/recipe.js');

module.exports = {
  createOne() {
    return new Recipe({
      title: `${faker.company.bs()} ${Math.floor(Math.random() * 10000)}`,
      author: `${faker.name.firstName()} ${faker.name.lastName()}`,
      text: faker.lorem.sentence(),
    })
    .save();
  },
  createMany(count) {
    const mockRecipes = new Array(count).fill(0).map(() => this.createOne());
    return Promise.all(mockRecipes);
  },
};
