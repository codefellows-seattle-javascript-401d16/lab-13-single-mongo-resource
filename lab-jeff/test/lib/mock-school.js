'use strict';

const faker = require('faker');
const School = require('../../model/school.js');


const mockSchool = module.exports = {};

mockSchool.createOne = () => {
  return new School({
    schoolName: faker.random.words(2),
  })
  .save();
};

mockSchool.createMany = (n) => {
  let mockSchoolArray = new Array(n)
    .fill(0).map(() => mockSchool.createOne());
  return Promise.all(mockSchoolArray);
};
