const expect = require('expect');
const superagent = require('superagent');
require('dotenv').config({ path: `${__dirname}/.env`});

const server = require('../lib/server.js');
const Recipe = require('../model/recipe.js');
const Ingredient = require('../model/ingredient.js');

const API_URL = `http://localhost:${process.env.PORT}/api/recipes`;
const INGREDIENT_URL = `http://localhost:${process.env.PORT}/api/ingredients`;
const NO_SUCH_ID = 128; // arbitrary

describe('server integration test', () => {

  let testRecipeForIngredientId;

  before(() => {
    return server.start()
      .then(() => Ingredient.remove({}))
      .then(() => Recipe.remove({}))
      .then(() => new Recipe({
        title: 'Mashed potatoes',
        author: 'Tyler',
        text: 'Boil then mash!',
      }).save())
      .then(recipe => {
        testRecipeForIngredientId = recipe._id;
      });
  });

  after(() => {
    return Ingredient.remove({})
      .then(() => Recipe.remove({}))
      .then(() => server.stop());
  });

  const testRecipe = {
    title: 'Salad',
    author: 'Greta',
    text: 'Mix greens and serve',
  };
  let testRecipeId;



  it('should respond 201 with the added recipe to a valid POST', () => {
    return superagent.post(API_URL)
      .send(testRecipe)
      .then(res => {
        expect(res.status).toEqual(201);
        expect(res.body.title).toEqual(testRecipe.title);
        expect(res.body.author).toEqual(testRecipe.author);
        expect(res.body.text).toEqual(testRecipe.text);
        testRecipeId = res.body._id;
        expect(testRecipeId).toExist();
      });
  });

  it('should respond 400 to a malformed POST', () => {
    return superagent.post(API_URL)
      .send({ yummy: 'yes' })
      .catch(err => expect(err.status).toEqual(400));
  });

  it('should respond 409 to a POST with duplicate title', () => {
    return superagent.post(API_URL)
      .send(testRecipe)
      .catch(err => expect(err.status).toEqual(409));
  });

  const testIngredient = {
    name: 'Lettuce',
    description: 'crisp and green',
    recipe: null,
  };
  let testIngredientId;

  it('should respond 201 to a POST with the added ingredient', () => {
    testIngredient.recipe = testRecipeForIngredientId;
    return superagent.post(INGREDIENT_URL)
      .send(testIngredient)
      .then(res => {
        expect(res.status).toEqual(201);
        expect(res.body.name).toEqual(testIngredient.name);
        expect(res.body.description).toEqual(testIngredient.description);
        expect(res.body.recipe).toEqual(testIngredient.recipe);
        testIngredientId = res.body._id;
      });
  });

  it('should respond 200 with recipe to a valid GET', () => {
    return superagent.get(`${API_URL}/${testRecipeId}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(testRecipe.title);
        expect(res.body.author).toEqual(testRecipe.author);
        expect(res.body.text).toEqual(testRecipe.text);
      });
  });

  it('should respond 200 to ingredient to a valid GET', () => {
    return superagent.get(`${INGREDIENT_URL}/${testIngredientId}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual(testIngredient.name);
      });
  });

  it('should respond 404 to an invalid GET', () => {
    return superagent.get(`${API_URL}/${NO_SUCH_ID}`)
      .catch(err => expect(err.status).toEqual(404));
  });

  const updatedRecipe = {
    author: 'Gretel',
  };

  it('should respond 202 with updated recipe to a valid PUT', () => {
    return superagent.put(`${API_URL}/${testRecipeId}`)
      .send(updatedRecipe)
      .then(res => {
        expect(res.status).toEqual(202);
        expect(res.body.author).toEqual(updatedRecipe.author);
        expect(res.body.title).toEqual(testRecipe.title);
      });
  });

  it('should respond 202 with updated ingredient to a valid PUT', () => {
    return superagent.put(`${INGREDIENT_URL}/${testIngredientId}`)
      .send({
        name: 'iceberg lettuce',
      })
      .then(res => {
        expect(res.status).toEqual(202);
        expect(res.body.name).toEqual('iceberg lettuce');
        expect(res.body.description).toEqual(testIngredient.description);
      });
  });

  it('should respond 404 to a PUT to nonexistent id', () => {
    return superagent.put(`${API_URL}/${NO_SUCH_ID}`)
      .send(testRecipe)
      .catch(err => expect(err.status).toEqual(404));
  });

  it('should respond 204 to a valid DELETE', () => {
    return superagent.delete(`${API_URL}/${testRecipeId}`)
      .then(res => expect(res.status).toEqual(204));
  });

  it('should respond 204 to a valid ingredient DELETE', () => {
    return superagent.delete(`${INGREDIENT_URL}/${testIngredientId}`)
      .then(res => expect(res.status).toEqual(204));
  });

  it('should have deleted it', () => {
    return superagent.get(`${API_URL}/${testRecipeId}`)
      .catch(err => expect(err.status).toEqual(404));
  });

  it('should respond 404 to a DELETE on a nonexistent id', () => {
    return superagent.delete(`${API_URL}/${NO_SUCH_ID}`)
      .catch(err => expect(err.status).toEqual(404));
  });

  it('should respond 404 to a request for a nonexistent page', () => {
    return superagent.get(`${API_URL}/best_recipes`)
      .catch(err => expect(err.status).toEqual(404));
  });

});
