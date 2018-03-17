const { MongoClient } = require('mongodb');
const _ = require('ramda');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const { genAllData, genOneData } = require('./datagen.js');
const { Booking } = require('./index.js');

let time = new Date().getTime();

const seedDB = () => {
  MongoClient.connect('mongodb://localhost/').then((client) => {
    const db = client.db('bookings');
    const collection = db.collection('bookings');

    let count = parseInt(100000 / numCPUs);
    const size = 100;

    async function insertBulk(start, stop) {
      let ops = _.range(start, stop).map((id) => {
        return { insertOne: { document: genOneData(id) } };
      });
      await collection.bulkWrite(ops, { ordered: false });
      count -= size;
      if (count > 0) {
        insertBulk(stop, stop + size);
      } else {
        console.log('done in ', (new Date().getTime() - time) / 1000, 's :3 ^_^ <3 <(^_^<)');
        client.close();
        process.exit();
      }
    }
    insertBulk(0, size);
  });
};

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} finished`);
  });
} else {
  seedDB();
  console.log(`worker ${process.pid} started`);
}
