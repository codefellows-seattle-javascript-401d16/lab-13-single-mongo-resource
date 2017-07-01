
. 1. npm run start-db (starts mongo db)

ERRORS:

1) testing /api/lists testing GET /api/lists/:id should respond with a list:
   Error: Not Found
    at Request.callback (node_modules/superagent/lib/node/index.js:675:11)
    at IncomingMessage.<anonymous> (node_modules/superagent/lib/node/index.js:883:18)
    at endReadableNT (_stream_readable.js:974:12)
    at _combinedTickCallback (internal/process/next_tick.js:80:11)
    at process._tickCallback (internal/process/next_tick.js:104:9)

2) testing /api/lists testing GET /api/lists should respond with a an array of 20 list:
   TypeError: Cannot read property 'map' of null
    at mockList.createMany.then.then.res (test/list-router-test.js:61:29)
    at process._tickCallback (internal/process/next_tick.js:109:7)

3) testing /api/lists testing GET /api/lists should respond with an array of 20 list:
   TypeError: Cannot read property 'map' of null
    at mockList.createMany.then.then.res (test/list-router-test.js:80:29)
    at process._tickCallback (internal/process/next_tick.js:109:7)

4) testing /api/lists testing GET /api/lists should respond with a an array of 20 list:
   TypeError: Cannot read property 'length' of null
    at mockList.createMany.then.then.res (test/list-router-test.js:101:24)
    at process._tickCallback (internal/process/next_tick.js:109:7)




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
X GET - test 404, responds with 'not found' for valid request made with an id that was not found
X GET - test 200, response body like {<data>} for a request made with a valid id
X PUT - test 200, response body like {<data>} for a post request with a valid body
X PUT - test 400, with invalid body
X PUT - test 404, with invalid id
DELETE - test 204, with valid id
DELETE - test 404, with invalid id
X POST - test 200, response body like {<data>} for a post request with a valid body
X POST - test 400, with an invalid request body
X POST - test 409, with an a conflict for a unique property
Bonus 2pts
create a GET /api/resource route that has pagination using query strings
