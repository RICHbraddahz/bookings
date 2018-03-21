const { genOneData } = require('./datagenPG');
const pgp = require('pg-promise')({
  capSQL: true,
});

const db = pgp('postgres://localhost:5432/seabnb');
const cs = new pgp.helpers.ColumnSet(
  ['unavailabledates', 'rating', 'numberofratings', 'guestmax', 'cost', 'minstay', 'maxstay', 'childrenallowed'],
  { table: 'bookings' },
);

function getNextData(t, pageIndex) {
  let data = null;
  if (pageIndex < 1000) {
    data = [];
    for (let i = 0; i < 10000; i += 1) {
      const idx = (pageIndex * 1000) + i; 
      data.push(genOneData());
    }
    console.log(pageIndex);
  }
  return Promise.resolve(data);
}

console.log('Begin seeding...');

db.tx('massive-insert', t => t.sequence(index => getNextData(t, index)
  .then((data) => {
    if (data) {
      const insert = pgp.helpers.insert(data, cs);
      return t.none(insert);
    }
  })))
  .then((data) => {
    const seconds = data.duration / 1000;
    const minutes = Math.floor(seconds / 60);
    const actualSeconds = Math.round(seconds - (minutes * 60));
    console.log('Total batches:', data.total, ', Duration:');
    console.log(`it took ${minutes} minutes and ${actualSeconds} seconds`);
  })
  .catch((error) => {
    console.log(error);
  });
