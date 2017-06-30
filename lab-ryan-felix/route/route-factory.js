'use strict';

const jsonParser = require('body-parser').json();

module.exports = (router, controller, path) => {

  router.post(path, jsonParser, (req, res, next) => {
    controller.create(req.body)
      .then(resource => res.status(201).json(resource))
      .catch(err => next(err));
  });

  router.get(`${path}:id`, (req, res, next) => {
    controller.read(req.params.id)
      .then(resource => res.status(200).json(resource))
      .catch(err => next(err));
  });

  router.put(`${path}:id`, (req, res, next) => {
    controller.update(req.params.id, req.body)
      .then(resource => res.status(202).json(resource))
      .catch(err => next(err));
  });

  router.delete(`${path}:id`, (req, res, next) => {
    controller.destroy(req.params.id)
      .then(() => res.status(204).send())
      .catch(err => next(err));
  });

  router.get(`${path}`, (req, res, next) => {
    controller.getPage(req.query.page)
      .then(resources => res.status(200).json(resources))
      .catch(err => next(err));
  });

  return router;

};
