const faker = require('faker');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/bookings');

const months = {
  1: '31',
  2: '28',
  3: '31',
  4: '30',
  5: '31',
  6: '30',
  7: '31',
  8: '31',
  9: '30',
  10: '31',
  11: '30',
  12: '31',
};

const genRandomDate = (monthInt, yearInt) => {
  let month = monthInt + Math.floor(Math.random() * 3);
  let year = yearInt;
  year = month > 12 ? year + 1 : year;
  month = month > 12 ? month - 12 : month;
  const numDays = months[month];
  const day = Math.floor(numDays * Math.random());
  const date = `${month}/${day}/${year}`;
  return date;
};

const genDateArray = (monthInt, yearInt) => {
  const length = Math.floor(Math.random() * 31);
  const dateArray = [];
  for (let i = 0; i < length; i += 1) {
    dateArray.push(genRandomDate(monthInt, yearInt));
  }
  return dateArray;
};

const genRating = () => {
  const rating = Math.floor(Math.random() * 6);
  return rating;
};

const genRatingAmount = (max) => {
  const amount = Math.floor(Math.random() * max);
  return amount;
};

const genGuestMax = (max) => {
  const amount = Math.floor(Math.random() * max);
  return amount;
};

const genCost = (max) => {
  const amount = Math.floor(Math.random() * max);
  return amount;
};

const genMinStay = (max) => {
  const amount = Math.floor(Math.random() * max);
  return amount;
};

const genMaxStay = (max) => {
  const amount = Math.floor(Math.random() * max);
  return amount;
};

const allowChildren = () => {
  if (Math.random() > .5) {
    return true;
  }
  return false;
};

console.log(genRatingAmount(2018));

const genOneData = (listingId) => {
  const booking = {
    id: listingId,
    unavailableDates: genDateArray(3, 2018),
    rating: genRating(),
    numberOfRatings: genRatingAmount(200),
    guestMax: genGuestMax(5),
    cost: genCost(300),
    minStay: genMinStay(3),
    maxStay: genMaxStay(20),
    childrenAllowed: allowChildren(),
  };
  return booking;
};

console.log(genOneData(2));

const genAllData = (quantity) => {

};

exports.genAllData = genAllData;