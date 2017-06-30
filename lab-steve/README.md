## Lab-Steve Lab-13 Documentation

UPDATE THE BELOW FOR LAB-13

### This app functions as a data store for hops and their basic characteristics that uses a RESTful API for data storage, display, and manipulation.

  * index.js employs 'dotenv', imports lib/server.js, and calls a server start script from server.js using the environmental port variable (3000).
  * lib/server.js defines the connection to the database using MongooseJS, sets up the server using Express, and requires route/hops-router.js, which defines all routes for the single-resource API.
    * The CORS module allows the API to be CORS-enabled for all origins.
    * The morgan module, in its simplest implementation, logs response codes, response times, and content-length for all HTTP requests.
  * model/hops.js defines the hops constructor and implements basic validation to prevent duplicate names.
  * The following methods will return the following results:
    * `GET localhost:3000/api/hops` - without a valid ID returns status code 200 and an array of all of the ids for that resource.
    * `GET localhost:3000/api/hops/xxxxxxxxxxxxxxxxxxxxxxxx` (hexadecimal) - returns status code 200 and a hop object matching a valid ID.
    * `GET localhost:3000/api/hops/12345` - returns a 404 error code and the details of the error if a valid ID is not included.
    * `POST localhost:3000/api/hops` - returns a 400 error code and the details of the error.
    * `POST localhost:3000/api/hops name=<name of the hop variety> minAA=<minimum alpha acid percent as a number> maxAA=<maximum alpha acid percent as a number> aroma=<aroma characteristics as a string> use=<the primary usages of the hop i.e., bittering, flavoring, or dry hopping...>` - returns status code 201 and a new hop object for a POST request with a valid body.
    * `PUT localhost:3000/api/hops` - returns a 404 error code and the details of the error if a valid ID is not included.
    * `PUT localhost:3000/api/hops/xxxxxxxxxxxxxxxxxxxxxxxx` - returns a 400 error code and the details of the error.
    * `PUT localhost:3000/api/hops/xxxxxxxxxxxxxxxxxxxxxxxx name=<STRING> minAA=<NUM> maxAA=<NUM> aroma=<STRING> use=<STRING>` - returns status code 202 an updated hop object for PUT request with valid ID and ANY NUMBER of parameters that should be changed, for instance, `PUT localhost:3000/api/hops/xxxxxxxxxxxxxxxxxxxxxxxx name='new name' use='new use'`.
    * `DELETE localhost:3000/api/hops` - returns a 204 status code and deletes all records for the resource.
    * `DELETE localhost:3000/api/hops?id=1` - returns 404 error code and and the details of the error for valid DELETE request made with an ID that was not found.
    * `DELETE localhost:3000/api/hops/xxxxxxxxxxxxxxxxxxxxxxxx` - returns  204 status code for a DELETE request with a valid ID.
  * Tests - Mocha spins up the server before all tests and spins it down afterwards and tests the routes in route/hops-router.js while employing Expect.
    1. `POST localhost:3000/api/hops passes in name='Magnum' minAA='10' maxAA='14' aroma='mild, herbal, piney and resinous' use='bittering'` - should return 201 status code and an object with name 'Magnum' and tests all the other parameters.  'res.body' is then assigned to the 'tempHop' variable, which is used in the remainder of the tests.
    2. `POST localhost:3000/api/hops` - should return a 400 error code for a POST request with no body.
    3. `POST localhost:3000/api/hops/${tempHop._id}` name='Magnum' ... - should return a 409 error code for a valid POST request that has a name parameter that already exists for another object in the DB.
    4. `GET localhost:3000/api/hops/${tempHop._id}` - should return a 200 status code and tempHop data for the specific ID.
    5. `GET localhost:3000/api/hops` - should return a 200 status code and an array of hops IDs.
    6. `GET localhost:3000/api/hops/12345` - should return 404 error code for GET request without a valid ID.
    7. `PUT localhost:3000/api/hops/${tempHop._id}` - passing in `{minAA: '11', aroma: 'herbal, piney and resinous'}` should return a 202 status code for valid PUT request with the specific ID with minAA changed to '11' and aroma changed to 'herbal, piney and resinous'.
    8. `PUT localhost:3000/api/hops/${tempHop._id}` - with no body should return 400 error code.
    9. `PUT localhost:3000/api/hops/12345` - should return 404 error code for PUT request without a valid ID and not delete anything.
    10. `DELETE localhost:3000/api/hops/${tempHop._id}` - should return 204 status code and DELETE the record matching the ID.
  * Project passes esLint.
  * NPM Scripts:
    * "test": "mocha" - Runs test scripts.
    * "lint": "eslint ." - Runs esLint on all scripts.
    * "watch": "nodemon index.js" - Runs NodeMon to start the server and watch for changes.
    * "start": "node index.js" - Starts the server.
    * "start-db": "mkdir -p ./db && mongod -dbpath ./db &" - Starts MongoDB daemon.
    * "stop-db": "killall mongod" - Stops MongoDB daemon.
