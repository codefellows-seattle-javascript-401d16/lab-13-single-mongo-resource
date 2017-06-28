'use strict';

//npm modules
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

//app modules



//module logic
// * config and connect to db
mongoose.promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

// * create app
const app = express();

// * load middleware
app.use('morgan'):
app.use('cors');

// * load routes


// * load 404 route
app.all('api/*', (req, res, next) => {
  req.sendStatus(404);
});

// * load error handler


//export start and stop

const server = module.exports = {};

server.isOn = false;
server.start = () => {
  if(!server.isOn){
    return new Promise((resolve, reject) => {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('server up on ', process.env.PORT);
        resolve();
      });
      return;
    });
    reject(new Error('server is already running'));
  };
};

server.stop = () => {
  if(server.http && server.isOn){
    return new Promise((resolve, reject) => {
      server.http.close();
      console.log('server down');
      resolve();
    });
    return;
  };
  reject(new Error('server not running'));
};
