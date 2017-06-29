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
-http://localhost:3500/api/teams

The server has 4 routes

teamRouter.post
this route serves the creating of new teamSchema

teamRouter.get - this route serves records from the teams collection and it requires that client passes a valid id.

teamRouter.post - this route creates we team records in the collections, the team name is a required field and if not passed it will give you a 400 error code.

teamRouter.put - this route is to update existing records in the team's collection and it requires a valid id, if an id is not passed it throws a 400 error code.

teamRouter.delete - this route is for deleting existing team's collections, it requires a valid id, error 400 will be send back if missing.
