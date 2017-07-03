'use strict';

const jsonParser = require('body-parser').json();
const issueRouter = module.exports = new require('express').Router();

const Issue = require('../model/issue.js');

issueRouter.post('/api/issues', jsonParser, (req, res, next) => {
  console.log('hit POST /api/issues');
  console.log(req.body, 'hit req body POST');
  new Issue(req.body)
  .save()
  .then(issue => res.json(issue))
  .catch(next);
});

issueRouter.get('/api/issues/:id', (req, res, next) => {
  console.log('hit /api/issues');

  Issue.findById(req.params.id)
  .then(issue => res.json(issue))
  .catch(next);
});

issueRouter.put('/api/issues/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/issues/:id');
  let checkLength = Object.keys(req.body);
  if (checkLength.length === 0)
  {return res.sendStatus(400);}
  Issue.findByIdAndUpdate(req.params.id, req.body, {    runValidators: true, new: true})
.then(issue => res.json(issue))
.catch(next);

  issueRouter.delete('/api/issues/:id', jsonParser, (req, res, next) => {
    console.log('DELETE /api/issues/:id');
    Issue.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
  });
});
