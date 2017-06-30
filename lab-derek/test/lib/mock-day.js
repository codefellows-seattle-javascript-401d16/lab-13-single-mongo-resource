'use strict';

const Day = require('../../model/day.js');
const mockYear = require('./mock-year.js');
const Year = require('../../model/year.js');

const mockDay = module.exports = {};

mockDay.createOne = () => {
  let result = {};
  return mockYear.createOne()
  .then(year => {
    result.year = year;
    return new Day ({
      dayOfWeek: 'sun',
      dayOfYear: Math.floor(1+Math.random()*366),
      year: year._id.toString(),
    })
    .save();
  })
  .then(day => {
    result.day = day;
    return result;
  });
};

// mockDay.createMany = (n, yearID) => {
//   let mockDayArray = new Array(n)
//   .fill(0).map(() => mockDay.createOne(yearID));
//   return Promise.all(mockDayArray);
// };
