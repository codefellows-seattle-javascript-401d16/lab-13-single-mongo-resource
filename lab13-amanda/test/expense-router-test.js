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

describe('testing POST /api/expenses', () => {
  before(server.start)
  after(server.stop)
  afterEach(clearDB)

  describe('testing POST /api/expenses', () => {
    let data = {title: faker.finance.amount()}
    it('should respond with an amount', () => {
      return superagent.post(`${API_URL}/api/expenses`)
        .send(data)
        .then(res => {
          console.log('data', data)
          expect(res.status).toEqual(200)
          expect(res.body.title).toEqual(data.title)
          expect(res.body.expenses).toEqual([])
          expect(res.body._id).toExist()
        })
    })
  })
})
