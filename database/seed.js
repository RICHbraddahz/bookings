const mongoose = require('mongoose');
const { Booking } = require('./index.js');
const { genAllData } = require('./datagen.js');

mongoose.connect('mongodb://localhost/bookings');

const seedDB = (data) => {
  const seedPromise = Booking.create(data);
  seedPromise.then(() => {
    console.log('Data has been entered into the database!');
    process.exit();
  });
};

seedDB(genAllData(5));
