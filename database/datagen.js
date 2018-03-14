const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookings');

const genOneData = (id) => {
  let booking = '';
  return booking;
};

const genAllData = (quantity) => {

};

exports.genAllData = genAllData;
