'use strict';

module.exports = (err, req, res, next) => {
  console.error(err.message);

  if(err.message.includes('Validation'))
    return res.sendStatus(400);

  if(err.message.includes('Duplicate'))
    return res.sendStatus(409);

  if(err.message.includes('Cast to ObjectId'))
    return res.sendStatus(404);

  res.sendStatus(500);
};
