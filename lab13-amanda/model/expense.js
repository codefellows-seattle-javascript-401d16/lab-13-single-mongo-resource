'use strict'

const mongoose = require('mongoose')
const Category = require('./category.js')

const expenseSchema = mongoose.Schema({
  content: {type: String, required: true},
  category: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'category'},
})

// hooks go here

expenseSchema.pre('save', function(next) {
  console.log('pre save doc', this)
  Category.findById(this.category)
    .then(category => {
      let expenseIDSet = new Set(category.expenses)
      expenseIDSet.add(this._id)
      category.expense = Array.from(expenseIDSet)
      return category.save()
    })
    .then(() => next())
    .catch(() =>
      next(new Error('validation failed to create expense because category does not exist')))
})


expenseSchema.post('remove', function(doc, next){
  console.log('post remove doc', doc)
  Category.findById(doc.category)
    .then(category => {
      category.expenses = category.expenses.filter(expense => expense._id !== doc._id)
      return category.save()
    })
    .then(() => next())
    .catch(next)
})


module.exports = mongoose.model('expense', expenseSchema)
