include a readme with a project description
how to install
how to start the server
document the routes

#documentation lab-13

Install this program by cloning the git project and calling npm init -y in the lab-mike folder. From there install all dependencies with npm i -S.

The database starts with npm run start-db, and stops with npm run stop-db.

The server starts with npm start.

Tests can be performed after installing developer dependencies with npm i -D and then calling npm test.

#A User has many Posts
A user has many posts, User is our one object, Posts is our many. This user requires a name, city and weight properties.

#post
The post request requires a body including a name as a unique string, a city as a string and a weight as a number to /api/users. The response includes a 200 status and the properties of the object created in the body including \_id, name, city and weight.

Sending partial user properties or no user properties results in a 400 status.

#get
The get request requires a valid id in the url, /api/users/:id. With a valid id, the user and it's properties are sent in the body with a 200 response.

With an invalid :id a 404 response is sent.

Sending a get request to /api/users results in an array of 10 users sent in the body pagination style.

#put
A put request requires a valid user url to /api/users/:id and a body to update. With a valid id and body to update the response includes the updated user. A valid update includes any combination of name, city and weight properties.

With no user properties sent, the original user is returned.

With invalid user properties sent the original is also returned for some reason.

#delete
A valid delete request requires a url to /api/users/:id. With a valid id the object is deleted and a 204 is sent. With an invalid or missing id a 404 not found response is sent.

#invalid paths/routes

Queries to invalid routes results in a 404 response.
