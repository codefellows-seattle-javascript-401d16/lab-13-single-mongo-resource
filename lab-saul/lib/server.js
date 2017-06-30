'use strict';

const express = require('express');
const mongoose = require('mongoose');
const assignmentRouter = require('../route/assignment-router.js');
const studentRouter = require('../route/student-routes.js');
const errorMiddleware = require('./error-middleware.js');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

let server;
const app = express();

app.use(studentRouter);
app.use(assignmentRouter);

app.all('/api/*', (req, res, next) => res.sendStatus(404));

app.use(errorMiddleware);

const serverControll = module.exports = {};

serverControll.start = () =>{
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn){
      server = app.listen(process.env.PORT, () =>{
        console.log('server up ::', process.env.PORT);
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject();
  });
};

serverControll.stop = () =>{
  return new Promise((resolve, reject) => {
    if(server || server.isOn){
      server.close(() =>{
        console.log('server down');
        server.isOn = false;
        resolve();
      });
      return;
    }
    reject();
  });
};
