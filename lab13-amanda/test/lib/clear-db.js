'use strict'

const Category = require('../../model/category.js')

module.exports = () => {
  return Promise.all([
    Category.remove({}),
  ])
}
