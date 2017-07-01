'use strict';

// npm modules
const jsonParser = require('body-parser').json();
const listRouter = module.exports = new require('express').Router();

// app modules
const List = require('../model/list.js');

// module logic POST
listRouter.post('/api/lists', jsonParser, (req, res, next) => {
  console.log('hit POST /api/lists');

  new List(req.body)
  .save()
  .then(list => res.json(list))
  .catch(next);
});

//GET
listRouter.get('/api/lists/:id', (req, res, next) => {
  console.log('hit /api/lists');

  List.findById(req.params.id)
  .then(list => res.json(list))
  .catch(next);
});

//PUT
listRouter.put('/api/lists/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/lists/:id', req.params.id);
  let options = {
    runValidators: true,
    new: true,
  };
  let checkLength = Object.keys(req.body);
  if (checkLength.length === 0) {
    return res.sendStatus(400);
  }
  console.log('req body', req.body);
  List.findByIdAndUpdate(req.params.id, req.body, options)
.then(list => res.json(list))
.catch(next);

//DELETE
  listRouter.delete('/api/lists/:id',  jsonParser, (req, res, next) => {
    console.log('DELETE /api/lists/:id');

    List.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
  });
});
