const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI);

//server

const app = express();
let server;

//middleware

app.use(cors());
app.use(morgan('dev'));

// routes

app.use(require('../route/crew-router.js'));
app.use(require('../route/ship-router.js'));

app.all('api/*', (req, res, next) => {
  res.sendStatus(404);
});

app.use(require('./error-middleware.js'));

const serverControl = module.exports = {};
serverControl.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn){
      server = app.listen(process.env.PORT, () => {
        console.log('server up', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject();
  });
};

serverControl.stop = () => {
  return new Promise((resolve, reject) => {
    if(server && server.isOn){
      server.close(() => {
        console.log('server down');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
