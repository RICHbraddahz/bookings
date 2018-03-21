const { MongoClient } = require('mongodb');
const { genOneData } = require('./datagenMongo.js');

async function generateBookings() {
  const connect = await MongoClient.connect('mongodb://localhost/27017');
  const database = connect.db('seabnb');
  const collection = database.collection('bookings');
  let bookings = [];
  const startTime = new Date().getTime();
  for (let i = 0; i <= 10000001; i += 1) {
    if (i % 100000 === 0) {
      await collection.insertMany(bookings)
      .catch((e) => {
        console.error(e);
        // connect.close();
      });
      const currentTime = new Date().getTime();
      const seconds = (currentTime - startTime) / 1000;
      const minutes = Math.floor(seconds / 60);
      const realSeconds = seconds - (minutes * 60);
      console.log(`Batch ${i} inserted`);
      console.log(`Finished seeding in ${minutes} minutes and ${realSeconds} seconds`);
      bookings = [];
    }
    const Booking = {
      id: i,
      bookings: genOneData(),
    };
    bookings.push(Booking);
  }
  collection.createIndex({ id: 1 });
  connect.close();
}
generateBookings();
