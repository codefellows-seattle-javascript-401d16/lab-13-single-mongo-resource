'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.message);

  //if validation error, respond with status 400
  if(err.message.toLowerCase().includes('validation failed'))
    return res.sendStatus(400);

  //if duplicate key error, respond with status 409
  if(err.message.indexOf('duplicate key') > -1)
    return res.sendStatus(409);

  //if can't find object ID, respond with status 404
  if(err.message.toLowerCase().includes('objectid failed'))
    return res.sendStatus(404);

  //else return 500 internal server error
  res.sendStatus(500);
};
