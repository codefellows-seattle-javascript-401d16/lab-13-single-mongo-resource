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
listRouter.get('/api/lists', (req, res, next) => {
  console.log('hit /api/lists');

  // let pageNumber = Number(req.query.page);
  // if(!pageNumber || pageNumber < 1) pageNumber = 1;
  // pageNumber--;

  List.findById(req.params.id)
  .then(list => res.json(list))
  .catch(next);

  // List.find({})
  // .sort({title: 'asc'})
  // .skip(pageNumber * 50)
  // .limit(50)
  // .then(lists => res.json(lists))
  // .catch(next);
});

//PUT
listRouter.put('/api/lists/:id', (req, res, next) => {
  console.log('hit PUT /api/lists/:id');

  let options = {
    runValidators: true,
    new: true,
  };

  List.findByIdAndUpdate(req.params.id, req.body, options)
.then(list => res.json(list))
.catch(next);

//DELETE
  listRouter.delete('/api/lists/:id', (req, res, next) => {
    console.log('DELETE /api/lists/:id');

    List.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
  });
});
