const mongoose = require('mongoose');
const { Booking } = require('./index.js');
const { genAllData, genOneData } = require('./datagen.js');

mongoose.connect('mongodb://localhost/bookings');

const seedDB = (data) => {
  const seedPromise = Booking.create(data);
  seedPromise.then(() => {
    console.log('Data has been entered into the database!');
    process.exit();
  });
};

const seedMany = (quantity) => {
  for (let i = 0; i < quantity; i += 100) {
    seedDB(genAllData(i, quantity));
  }
};

seedMany(200);

