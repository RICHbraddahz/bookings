const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/seabnb');
// const data = require('../fakeData.js');
const { genAllData } = require('./datagenMongo');
const data = genAllData(0, 1000);
const bookingsSchema = mongoose.Schema({
  id: Number,
  unavailableDates: Array,
  rating: Number,
  numberOfRatings: Number,
  guestMax: Number,
  cost: Number,
  minStay: Number,
  maxStay: Number,
  childrenAllowed: Boolean,
});
// string is table name
const Booking = mongoose.model('bookings', bookingsSchema);
const save = (singleBooking) => {
  const newBooking = new Booking({
    id: singleBooking.id,
    unavailableDates: singleBooking.unavailable_dates,
    rating: singleBooking.rating,
    numberOfRatings: singleBooking.rating_amount,
    guestMax: singleBooking.guest_max,
    cost: singleBooking.cost,
    minStay: singleBooking.min_stay,
    maxStay: singleBooking.max_stay,
    childrenAllowed: singleBooking.children_allowed,
  });
  newBooking.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('successfully saved');
    }
  });
};

const other = () => {
  for (let i = 0; i < data.length; i += 1) {
    save(data[i]);
  }
};


const find = (listId, callback) => {
  Booking.find({ id: listId }, (err, item) => {
    callback(item);
  });
};

module.exports.other = other;
module.exports.find = find;
module.exports.db = mongoose;
module.exports.Booking = Booking;
module.exports.bookingsSchema = bookingsSchema;
module.exports.save = save;
