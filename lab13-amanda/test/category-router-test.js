'use strict'

require('dotenv').config({path: `${__dirname}/../../test.env`})

const faker = require('faker')
const expect = require('expect')
const superagent = require('superagent')

const server = require('../lib/server.js')
const clearDB = require('./lib/clear-db.js')
const mockExpense= require('./lib/mock-expense.js')
const mockCategory = require('./lib/mock-category.js')

let tempExpense
const API_URL = process.env.API_URL

describe('testing GET /api/categorys/:id', () => {
  it('should respond with an expense', () => {
    let tempCategories
    return mockECategory.createOne()
    .then(expenses => {
      tempCategories = categorys






      ;
      return superagent.get(`${API_URL}/api/expenses`)
    })
    then(res => {
      console.log(res.body.map(expense => expenses.title))
      expect(res.status).toEqual(200)
      expect(res.body.length).toEqual(5)
      res.body.forEach(expense => {
        expect(expense._id).toExist()
        expect()
      })
    })
