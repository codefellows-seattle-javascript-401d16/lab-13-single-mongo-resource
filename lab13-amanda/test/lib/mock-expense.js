'use strict'

// npm modules
const faker = require('faker')

// app modules
const mockCategory = require('./mock-category.js')
const Expense = require('../../model/expense.js')

const mockExpense = module.exports = {}

mockExpense.createOne = () => {
  let result = {}
  return mockExpense.createOne()
    .then(expense => {
      result.expense = expense
      return new Expense({
        content: faker.finance.amount(),
        expense: expense._id.toString(),
      })
        .save()
    })
    .then(task => {
      result.task = task
      return result
    })
}

mockExpense.createMany = (n) => {
  let result = {}
  return mockExpense.createOne()
    .then(expense => {
      result.expense = expense
      let expenseSavePromises = new Array(n).fill(0)
        .map(() => new Expense({
          content: faker.finance.amount(),
          expense: expense._id.toString(),
        }).save())
      return Promise.all(expenseSavePromises)
    })
    .then(expences => {
      result.expences = expences
      return result
    })
}
