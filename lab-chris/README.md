
## Install  
- All necessary dependencies are saved in the package.json file in this repo. "npm i" to download

## Commands  

### npm run start-db  
- Creates a database if one does not exist. Otherwise it just starts the database.

### npm run stop-db  
- Stops database program

### npm run test  
- This will run all of the written tests

### npm start  
- Starts the server

## Routes  

* `GET` request
 * pass the id of a resource though the query string to fetch a resource   
* `POST` request
 * pass data as stringified json in the body (see player.js for required data) to create a resource  
* `PUT` request
 * pass data as stringified json in the body of a put request to update a resource
* `DELETE` request
 * pass the id of a resource though the query string to delete a resource   
