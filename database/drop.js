const mongoose = require('mongoose');
const { Booking } = require('./index.js');

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

// mongoose.connection.collections['bookings'].drop( function(err) {
//   console.log('collection dropped');
// });

dropDB();

exports.dropDB = dropDB;
