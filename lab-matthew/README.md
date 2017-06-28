![cf](https://i.imgur.com/7v5ASc8.png) lab 13 two resource express api
======

# To Submit this Assignment
  * fork this repository
  * write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-duncan`
  * push to your repository
  * submit a pull request to this repository
  * submit a link to your PR in canvas
  * write a question and observation on canvas

# Build Tool Instructions
* create a package.json that lists all dependencies and developer dependencies
* include a .env and .test.env
* include an .eslintrc
* include a .gitignore
* include a readme with a project description
  * how to install
  * how to start the server
  * document the routes
* include a package.json 
  * have a lint script for running eslint
  * have a test script for running mocha
  * start script for running your server
  * have a start-db script for running mongod
  * have a stop-db script for stoping mongod

# Directions
* Create these directories to organize your code:
 * lib
 * model
 * route
 * db 
 * test
* Create a HTTP Server using `express`
* Come up with two models that have a one to many relationship 
  
* using mongoose create the first resource in the one to many relationship
 * it can not have the same properties as the in class sample code, or yesterdays lab
 * make sure you include at least one propertie with the `unique` validator set to true
 * Also include two other properties of your choice (like name, creationDate, etc.)
* use the `body-parser` express middleware to on `POST` and `PUT` routes

## Server Endpoints
### `/api/resource-name`
* `POST` request
 * pass data as stringified json in the body of a post request to create a resource

### `/api/resource-name/:id`
* `GET` request
 * pass the id of a resource though the query string to fetch a resource   
* `PUT` request
 * pass data as stringified json in the body of a put request to update a resource
* `DELETE` request
 * pass the id of a resource though the query string to delete a resource   

## Tests
* your tests should start your server when they begin and stop your server when they finish
* write a test to ensure that your api returns a status code of 404 for routes that have not been registered
* write tests to ensure your `/api/resource-name` endpoint responds as described for each condition below:
 * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
 * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
 * `PUT` - test 200, response body like  `{<data>}` for a post request with a valid body
 * `PUT` - test 400, with invalid body
 * `PUT` - test 404, with invalid id
 * `DELETE` - test 204, with valid id
 * `DELETE` - test 404, with invalid id 
 * `POST` - test 200, response body like  `{<data>}` for a post request with a valid body
 * `POST` - test 400, with an invalid request body
 * `POST` - test 409, with an a conflict for a unique property
 
 # Bonus 2pts 
* create a `GET /api/resource` route that has pagination using query strings
