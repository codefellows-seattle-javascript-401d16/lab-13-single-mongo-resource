##RESTful API
To install this app, you need to first run the following command which installs all the dependencies requred for the app to function correctly.

npm init -y

###dependencies
-express
-body-parser
-mongoose
-dotenv
-morgan
-cors

to initialize the server to feed requests for client, the following command will start the server
-npm start

Clients can consume the resources of the server by accessing the following endpoint
-http://localhost:3500/api/restaurant

The server has 4 routes

restaurantRouter.post
this route serves the creating of new restaurantSchema

restaurantRouter.get - this route serves records from the restaurant collection and it requires that client passes a valid id.

restaurantRouter.post - this route creates we restaurant records in the collections, the restaurant name is a required field and if not passed it will give you a 400 error code.

restaurantRouter.put - this route is to update existing records in the restaurant's collection and it requires a valid id, if an id is not passed it throws a 400 error code.

restaurantRouter.delete - this route is for deleting existing restaurant's collections, it requires a valid id, error 400 will be send back if missing.
