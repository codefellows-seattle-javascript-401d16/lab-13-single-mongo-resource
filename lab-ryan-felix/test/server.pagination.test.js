const expect = require('expect');
const superagent = require('superagent');
require('dotenv').config({ path: `${__dirname}/.env`});

const server = require('../lib/server.js');
const Recipe = require('../model/recipe.js');
const Ingredient = require('../model/ingredient.js');
const mockDatabase = require('./lib/mock-database.js');

const API_URL = `http://localhost:${process.env.PORT}/api/recipes`;
const INGREDIENT_URL = `http://localhost:${process.env.PORT}/api/ingredients`;
const RECIPE_PAGE_LENGTH = 20;
const INGREDIENT_PAGE_LENGTH = 25;

describe('server pagination test', () => {

  before(() => {
    return server.start()
      .then(() => Ingredient.remove({}))
      .then(() => Recipe.remove({}))
      .then(() => mockDatabase(1))
      .then(() => Ingredient.find({}))
      .then(() => console.log('100 mock recipes (with ingredients) added to db'));
  });

  after(() => {
    return Recipe.remove({})
      .then(() => server.stop());
  });

  it('should return the first page of recipes', () => {
    return superagent.get(`${API_URL}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(RECIPE_PAGE_LENGTH);
        res.body.forEach((recipe) => {
          expect(recipe._id).toExist();
          expect(recipe.title).toExist();
          expect(recipe.author).toExist();
          expect(recipe.text).toExist();
        });
      });
  });

  it('should return a requested page of recipes', () => {
    return superagent.get(`${API_URL}?page=2`)
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(RECIPE_PAGE_LENGTH);
      res.body.forEach((recipe) => {
        expect(recipe._id).toExist();
        expect(recipe.title).toExist();
        expect(recipe.author).toExist();
        expect(recipe.text).toExist();
      });
    });
  });

  it('should return the first page of ingredients', () => {
    return superagent.get(`${INGREDIENT_URL}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(INGREDIENT_PAGE_LENGTH);
        res.body.forEach((ingredient) => {
          expect(ingredient._id).toExist();
          expect(ingredient.name).toExist();
          expect(ingredient.description).toExist();
          expect(ingredient.recipe).toExist();
        });
      });
  });

  it('should return a requested page of ingredients', () => {
    return superagent.get(`${INGREDIENT_URL}?page=2`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(INGREDIENT_PAGE_LENGTH);
        res.body.forEach((ingredient) => {
          expect(ingredient._id).toExist();
          expect(ingredient.name).toExist();
          expect(ingredient.description).toExist();
          expect(ingredient.recipe).toExist();
        });
      });
  });
});
