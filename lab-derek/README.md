<!-- include a readme with a project description
how to install
how to start the server
document the routes -->

# README: Lab-12 Express middleware

## Install the following dependencies:

### For production:
* body-parser
* dotenv
* express
* mongoose
* cors
* morgan


### For development:
* mocha
* expect
* superagent
* faker

## Start the server:

* initialize the database by running 'npm run start-db' from the terminal.
* initialize the server by running 'npm start' in the terminal.

## Routes:

* POST: An http post route will accept a new transaction with the following data in request:

name: any string of characters,
sendingBankRouting: the routing number of the sending bank.,
receivingBankRouting: the routing number of the receiving bank,
amount: the amount of transaction, in dollars.
uniqueID: a unique identifier for project purposes only.

A unique ID and timestamp will be assigned to the transaction on receipt.

* GET: By making an API request with a valid id in the query you will receive data for the associated transation.

* PUT: By making a put http request to the API with a valid id in the query you can provide an updated query field for any transaction, in the format {name: '***newname***'};

* DELETE: By making an delete http request to the API  with a valid id in the query you can delete an existing transaction.
