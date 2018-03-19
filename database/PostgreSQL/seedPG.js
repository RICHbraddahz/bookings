const { genOneData } = require('./datagenPG');

const pgp = require('pg-promise')({
  capSQL: true,
});

const db = pgp('postgres://localhost:5432/bookings');
const cs = new pgp.helpers.ColumnSet(
  [
    'unavailableDates', 'type', 'rating', 'numberofRatings', 'guestMax', 'cost', 'minStay', 'maxStay', 'childrenAllowed',
  ],
  {
    table: 'bookings',
  },
);

const getNextData = (t, pageIndex) => {
  let data = null;
  if (pageIndex < 1000) {
    data = [];
    for (let i = 0; i < 10000; i += 1) {
      data.push(genOneData);
    }
    console.log(pageIndex);
  }
  return Promise.resolve(data);
};

db.tx('massive-insert', (t) => {
  return t.sequence((index) => {
    return getNextData(t, index)
      .then((data) => {
        if (data) {
          const insert = pgp.helpers.insert(data, cs);
          return t.none(insert);
        }
        return null;
      });
  });
})
  .then((data) => {
    console.log('Total batches:', data.total, ', Duration:', data.duration);
  })
  .catch((error) => {
    console.log(error);
  });
