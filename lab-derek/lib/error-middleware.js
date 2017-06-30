'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.message);
  console.log('hitting here whatwhat');

  //if validation error respond with 400
  if(err.message.toLowerCase().includes('validation failed') || err.message.toLowerCase().includes('number failed'))
    return res.sendStatus(400);

  //if duplication error respond with 409
  if(err.message.toLowerCase().includes('duplicate key'))
    return res.sendStatus(409);

  //if id not found respond with 404
  if(err.message.toLowerCase().includes('objectid failed'))
    console.log('here too watwat')
    return res.sendStatus(404);

  //else respond with 500
  return res.sendStatus(500);
};
