'use strict';

const express = require('express');
const app = express();



const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if (!server.isOn) {
      server.http = app.listen(process.env.PORT, () =>{
        server.isOn= true;
        console.log('server up on', process.env.PORT);
        resolve();
      });
      return;
    }
    reject(new Error('the server is already running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (server.isOn) {
      server.http = app.close(() => {
        server.isOn = false;
        resolve();
        console.log('server shut down');
      });
      return;
    }
    reject(new Error('the server is alrady off'));
  });
};
