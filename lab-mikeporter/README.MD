include a readme with a project description
how to install
how to start the server
document the routes

#documentation lab-11

Install this program by clonging the git project and calling npm init -y in the lab-mike folder. From there install all dependencies with npm i -S.

The server starts with npm run start-db, and stops with npm run stop-db.

The program starts with npm start.

Tests can be performed after installing developer dependencies with npm i -D and then calling npm test.

#Base object
Our base object is a shoe. This shoe requires a brand, color and size property.

#post
The post request requires a body including a brand as a string, a color as a string and a size as a number to /api/shoes. The response includes a 200 status and the properties of the object created in the body including \_id, brand, color and size.

Sending partial shoe properties or no shoe properties results in a 400 status.

#get
The get request requires a valid id in the url, /api/shoes/:id. With a valid id, the shoe and it's properties are sent in the body with a 200 response. With no :id or an invalid :id a 404 response is sent.

#put
A put request requires a valid shoe url to /api/shoes/:id and a body to update. With a valid id and body to update the response includes the updated shoe. A valid update includes any combination of brand, color and size properties. With no shoe properties sent or an invalid id, a 404 response is sent.

#delete
A valid delete request requires a url to /api/shoes/:id. With a valid id the object is deleted and a 204 is sent. With an invalid or missing id a 404 not found response is sent.
