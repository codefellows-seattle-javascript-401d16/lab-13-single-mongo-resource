'use strict'

const jsonParser = require('body-parser').json
const expenseRouter = module.exports = new require('express').Router()

const Expense = require('../model/expense.js')

expenseRouter.post('/api/expenses', jsonParser, (req, res, next) => {
  console.log('hit POST /api/expenses')
  new Expense(req.body)
    .save()
    .then(expense => res.json(expense))
    .catch(next)
})

expenseRouter.put('/api/expenses/:id', jsonParser, (req, res, next) => {
  console.log('hit PUT /api/expenses/:id')
  let options = {
    new: true,
    runValidators: true,
  }
  Expense.findByIdAndUpdate(req.params.id, req.body, options)
    .then(expense => res.json(expense))
    .catch(next)
})

expenseRouter.get('/api/expenses/:id', jsonParser, (req, res, next) => {
  console.log('hit GET /api/expenses/:id')
  Expense.findById(req.params.id)
    .then(expense => res.json(expense))
    .catch(next)
})

expenseRouter.delete('/api/expenses/:id', jsonParser, (req, res, next) => {
  console.log('hit DELETE /api/expenses/:id')
  Expense.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next)
})
