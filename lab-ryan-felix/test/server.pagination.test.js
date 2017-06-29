const expect = require('expect');
const superagent = require('superagent');
require('dotenv').config({ path: `${__dirname}/.env`});

const server = require('../lib/server.js');
const Recipe = require('../model/recipe.js');
const mockRecipes = require('./lib/mock-recipes.js');

const API_URL = `http://localhost:${process.env.PORT}/api/recipes`;
const PAGE_LENGTH = 20;

describe('server pagination test', () => {

  before(() => {
    return server.start()
      .then(() => Recipe.remove({}))
      .then(() => mockRecipes.createMany(200))
      .then(() => console.log('200 mock recipes added to db'));
  });

  after(() => {
    return Recipe.remove({})
      .then(() => server.stop());
  });

  it('should return the first page of recipes', () => {
    return superagent.get(`${API_URL}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(PAGE_LENGTH);
        res.body.forEach((recipe) => {
          expect(recipe._id).toExist();
          expect(recipe.title).toExist();
          expect(recipe.author).toExist();
          expect(recipe.text).toExist();
        });
      });
  });

  it('should return a requested page of recipes', () => {
    return superagent.get(`${API_URL}?page=5`)
    .then(res => {
      expect(res.status).toEqual(200);
      expect(res.body.length).toEqual(PAGE_LENGTH);
      res.body.forEach((recipe) => {
        expect(recipe._id).toExist();
        expect(recipe.title).toExist();
        expect(recipe.author).toExist();
        expect(recipe.text).toExist();
        console.log(recipe.title);
      });
    });
  });
});
