const mongoose = require('mongoose');
const { Recommendations } = require('./dataGen');

mongoose.connect('mongodb://localhost/bookings');

const dropDB = () => {
  Booking.remove({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Collection removed');
      process.exit();
    }
  });
};

dropDB();

exports.dropDB = dropDB;
