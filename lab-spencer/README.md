# NHL Team REST API  

## Install  
- To install my API you can do so by cloning this repo:  
```
git clone https://github.com/SpenGietz/lab-13-single-mongo-resource.git
```
- To add this to your own project:  
```
npm i -S lab13-spencer
```
- After installation, you need to make sure that you have both a ".env" and a ".test.env" file in the home directory to handle the environment variables in the following format:  
```
PORT=3000
MONGODB_URI='mongodb://localhost/dev'
API_URL='http://localhost:3000'
```
```
PORT=7000
MONGODB_URI='mongodb://localhost/test'
API_URL='http://localhost:7000'
```

## Commands  

### npm run start-db  
- This will start the database that is required by the API  

### npm run stop-db  
- This will stop the database when you are done  

### npm lint  
- This will run your linter through this modules code  

### npm test  
- This will run all of the tests I've written to confirm everything is working properly  

### npm start  
- This will run the server and it will be ready for API requests  

## Routes  

### /api/nhl/teams  
- This route accepts POST GET PUT and DELETE requests  

#### POST  
- You can add teams to the database by posting JSON in the following format. It will respond with the added team  
```
{
  "name": "Blackhawks",
  "city": "Chicago",
  "state": "IL",
  "wins": 12,
  "losses": 40,
  "ties": 3
}
```

#### GET  
- A GET request in the format /api/nhl/teams/teamid will respond with the information for the team with the ID of teamid in the database  

#### PUT  
- You can update teams by sending a PUT request to /api/nhl/teams/teamid with the updated info as JSON in the following format:  
```
{
  "name": "Blackhawks",
  "city": "Chicago",
  "state": "IL",
  "wins": 12,
  "losses": 40,
  "ties": 3
}
```

#### DELETE  
- You can delete teams from the database by sending a request to /api/nhl/teams/teamid and you will receive 204 if it's successful and 404 if that team doesn't exist  

### /api/*  
- Any other route will respond with a 404  
