#HOw to install:

* first fork and clone from github
* npm i to install the dependencies
* set your db start/stop and test commands (Mocha to test)

#Get routes

* Get with valid id - for request with Valid id
* 404 Error for when you forget the id

#PUT routes

* Put(update) with valid id - for request with Valid id
* 400 Error - for request with invalid body
* 404 Error for when you use an invalid id or forget the id

#Delete routes

* Delete with valid id - for request with Valid id
* 404 Error for when you use an invalid id or forget the id

#Post routes

* Post with valid body - for request with Valid id
* 409 Error for when you have a 'unique item' conflict
* 404 Error for when you use an invalid id or forget the id
