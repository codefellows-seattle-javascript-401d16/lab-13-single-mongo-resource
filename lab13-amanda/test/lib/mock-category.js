'use strict'

const faker = require('faker')
const Category = require('../../model/category.js')


const mockCategory = module.exports = {}

mockCategory.createOne = () => {
  return new Category({
    title: faker.random.words(1),
  })
    .save()
}

mockCategory.createMany = (n) => {
  let mockCategoryArray = new Array(n)
    .fill(0).map(() => mockCategory.createOne())
  return Promise.all(mockCategoryArray)
}
