# Lab 12

## How To Install

* From the directory where package.json is located, type:
> npm install

## How To Start The Server

* To start the server, type the following command from the root directory of the application:
> npm run start

## Routes

* To Create a team member.
> http POST localhost/api/team?firstName=**string**.&&lastName=**string**&&availabilityDate=**datestring**

* To Read a member from the database.
> http GET localhost/api/team?_id=**id of user**

* To Update a team member's entry.
> http PUT localhost/api/team?firstName=**string**.&&lastName=**string**&&availabilityDate=**datestring**

* To Delete a team member.
> http GET localhost/api/team?_id=**id of user to be deleted**
