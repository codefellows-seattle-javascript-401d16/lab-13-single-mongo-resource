

# Lab 13/14

# This project:

* Creates an Object Constructor using mongoose that creates a _resource_ with at least 3 properties



# How to install mongoose

npm i -S mongoose after typing brew install mongodb(on mac)

how to start the server

include start-db and stop-db in scripts of package.json

for start-db type in mkdir -p ./db && mongod --dbpath ./db

for stop-db type in killall mongod


# This is a RESTful API

### `/api/cars`

* `POST` request
 * pass data as stringified json in the body of a post request to create a resource

### `/api/cars/:id`
* `GET` request
 * pass the id of a resource though the query string to fetch a resource   
* `PUT` request
 * pass data as stringified json in the body of a put request to update a resource
* `DELETE` request
 * pass the id of a resource though the query string to delete a resource   

## Tests

_Tests were written for this API_URL_


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
