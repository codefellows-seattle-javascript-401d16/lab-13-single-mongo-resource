
. 1. nm run start-db (starts mongo db)



make sure you include at least one propertie with the unique validator set to true

Also include two other properties of your choice (like name, creationDate, etc.)

use the body-parser express middleware to on POST and PUT routes

Server Endpoints

/api/resource-name

POST request
pass data as stringified json in the body of a post request to create a resource
/api/resource-name/:id

GET request
pass the id of a resource though the query string to fetch a resource
PUT request
pass data as stringified json in the body of a put request to update a resource
DELETE request
pass the id of a resource though the query string to delete a resource
Tests

your tests should start your server when they begin and stop your server when they finish
write a test to ensure that your api returns a status code of 404 for routes that have not been registered
write tests to ensure your /api/resource-name endpoint responds as described for each condition below:
GET - test 404, responds with 'not found' for valid request made with an id that was not found
GET - test 200, response body like {<data>} for a request made with a valid id
PUT - test 200, response body like {<data>} for a post request with a valid body
PUT - test 400, with invalid body
PUT - test 404, with invalid id
DELETE - test 204, with valid id
DELETE - test 404, with invalid id
POST - test 200, response body like {<data>} for a post request with a valid body
POST - test 400, with an invalid request body
POST - test 409, with an a conflict for a unique property
Bonus 2pts
create a GET /api/resource route that has pagination using query strings
