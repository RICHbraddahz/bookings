const { MongoClient } = require('mongodb');
const dateMath = require('date-arithmetic');

const url = 'mongodb://localhost:27017';
const dbName = 'seabnb';
const startId = 0;
const endId = 10000000;
const idCount = 10000;

const getAverage = array => ((array.reduce((acc, val) => acc + val)) / array.length);

const getBenchmark = async () => {
  const client = await MongoClient.connect(`${url}/${dbName}`);
  const db = client.db(dbName);
  const collection = db.collection('similarlistings');
  const startTime = new Date();
  console.log('|******************************************************');
  console.log('| Building benchmark for MongoDB indexed by id');
  console.log(`| Querying ${idCount} ids from ${startId} to ${endId}`);
  console.log(`| Start time: ${startTime}`);
  console.log('|******************************************************');

  const readTimes = [];

  for (let i = 0; i < idCount; i += 1) {
    const readStartTime = new Date()
    const randomNum = Math.floor(Math.random() * 10000000);
    await collection.findOne({ id: randomNum });
    const readTime = dateMath.diff(readStartTime, new Date(), 'seconds', true);
    readTimes.push(readTime);
    console.log(`| Found id ${randomNum} in ${readTime} seconds`);
  }

  const endTime = new Date();
  console.log('|******************************************************');
  console.log('| Benchmark is now complete.');
  console.log(`| Start time: ${startTime}`);
  console.log(`| End time: ${endTime}`);
  console.log(`| Total elapsed time: ${dateMath.diff(startTime, endTime, 'seconds', true)} seconds`);
  console.log(`| Average read time: ${getAverage(readTimes)} seconds`);
  console.log('|******************************************************');
};

getBenchmark();
