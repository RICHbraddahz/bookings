const pgp = require('pg-promise')({
  capSQL: true,
});
const dateMath = require('date-arithmetic');

const db = pgp('postgres://localhost:5432/seabnb');
const startId = 0;
const endId = 10000000;
const idCount = 20;

const getAverage = array => (array.reduce((acc, val) => acc + val)) / array.length;

const getBenchmark = async () => {
  const startTime = new Date();

  console.log('|******************************************************');
  console.log('| Building benchmark for PostgreSQL indexed by id');
  console.log(`| Querying ${idCount} ids from ${startId} to ${endId}`);
  console.log(`| Start time: ${startTime}`);
  console.log('|******************************************************');

  const readTimes = [];

  for (let i = 0; i < 10000; i += 1) {
    const readStartTime = new Date();
    const randomNum = Math.floor(Math.random() * 10000000);
    try {
      const users = await db.any(`SELECT * FROM bookings WHERE id = ${randomNum}`, [true]);
      const readTime = dateMath.diff(readStartTime, new Date(), 'seconds', true);
      readTimes.push(readTime);
      console.log(`| Found id ${randomNum} in ${readTime} seconds`);
    }
    catch (e) {
      console.error(e);
    }
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
