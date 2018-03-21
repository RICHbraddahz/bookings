// const db = require('../index.js');
const { MongoClient } = require('mongodb');
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { genAllData, genOneData } = require('./datagenMongo.js');
const { Booking } = require('./index.js');

async function generateBookings() {
  const connect = await MongoClient.connect('mongodb://localhost/27017');
  const database = connect.db('seabnb');
  const collection = database.collection('bookings');
  let bookings = [];
  let startTime = new Date().getTime();
  for (let i = 0; i <= 10000001; i++) {
    if (i % 100000 === 0) {
      await collection.insertMany(bookings)
      .catch((e) => {
        console.error(e);
        // connect.close();
      });
      let currentTime = new Date().getTime();
      let seconds = (currentTime - startTime) / 1000;
      let minutes = Math.floor(seconds / 60);
      let realSeconds = seconds - (minutes * 60);

      console.log(`inserted batch ${i}`);
      console.log(`Finished seeding, it took ${minutes} minutes and ${realSeconds} seconds have passed`)

      bookings = [];
    } 

    let Booking = {
      id: i,
      bookings: genOneData()
    };
    collection.createIndex({id:1})
    bookings.push(Booking);
  }
  connect.close();
};

generateBookings();


// let time = new Date().getTime();
// let round = 1;

// const seedDB = () => {
//   MongoClient.connect('mongodb://localhost/').then((client) => {
//     const db = client.db('bookings');
//     const collection = db.collection('bookings');

//     let count = parseInt(10000000 / numCPUs);
//     const size = 20000;

//     async function insertBulk(start, stop) {
//       const ops = _.range(start, stop).map((id) => {
//         const listId = id * round;
//         return { insertOne: { document: genOneData(listId) } };
//       });
//       await collection.bulkWrite(ops, { ordered: false });
//       count -= size;
//       if (count > 0) {
//         round += 1;
//         insertBulk(stop, stop + size);
//       } else {
//         console.log('done in ', (new Date().getTime() - time) / 1000, 's :3 ^_^ <3 <(^_^<)');
//         client.close();
//         process.exit();
//       }
//     }
//     insertBulk(0, size);
//   });
// };

// let finished = 0;
// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   // Fork workers
//   for (let i = 0; i < numCPUs; i += 1) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} finished`);
//     if (finished === 3) {
//       process.exit();
//     } else {
//       finished += 1;
//     }
//   });
// } else {
//   seedDB();
//   console.log(`worker ${process.pid} started`);
// }
