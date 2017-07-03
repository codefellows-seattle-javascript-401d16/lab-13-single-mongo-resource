# README
---
This web app allows you to store burger joint information into a mongodb.
---
### Requirements
1. MongoDB
2. .env file
```
PORT=3000
MONGODB_URI='mongodb://localhost/burgers'
API_URI='http:/localhost/'
```

### Starting up server
```
npm install
npm run start-db //in a separate terminal 
npm start
```

### Routes
```/api/burger-joint/:id```
#### **GET**
- Returns a 200 response code and a body containing the information of the burger
#### **PUT**
- Returns a 200 response code and a body with updated information. If only one property needs to be updated you can just have that property in the body.
```sample body
 { name: 'Rafiki Burger', location: 'Santeria' }
```
#### **DELETE**
- Returns a 204 response code if deletion was successful
#### **POST**
- Returns a 200 response code with the body
```sample body
 { name: 'Rafiki Burger', location: 'Santeria' }
```