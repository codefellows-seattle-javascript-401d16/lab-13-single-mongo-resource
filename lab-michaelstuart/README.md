# Lab 13 - double resource express api

## Functionality
- crud api affecting two resources
- demonstrates utility of promises versus callbacks
- create, read, update, destroy a user schema
- utilize mlab mongodb aws storage

## Examples
- POST http://localhost:8080/apiu/user { name, password, email } will create a user with those properties and generate an id
- GET http://localhost:8080/api/user/yourid will receive a user object as response
- GET http://localhost:8080/api/user will receive an array of user ids as response
- PUT http://localhost:8080/api/user/yourid { name: newname, id: yourid} will update the name property on the corresponing object with a new name
- DELETE http://localhost:8080/api/user/yourid will delete the user object associated with the id query param
