module.exports = (err, req, res, next) => {
  switch(err.type) {
  case err.types.NO_SUCH_ID:
    res.status(404);
    break;
  case err.types.UNIQUENESS:
    res.status(409);
    break;
  case err.types.VALIDATION:
    res.status(400);
    break;
  case err.types.UNKNOWN:
  default:
    res.status(500);
  }
  res.send();
};
