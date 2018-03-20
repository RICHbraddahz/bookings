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
  const day = Math.floor(numDays * Math.random()) + 1;
  const date = `${month}/${day}/${year}`;
  return date;
};

const genDateArray = (monthInt, yearInt) => {
  const length = Math.floor(Math.random() * 31);
  const dateArray = [];
  for (let i = 0; i < length; i += 1) {
    dateArray.push(genRandomDate(monthInt, yearInt));
  }
  return JSON.stringify(dateArray);
};

const genAmount = (max) => {
  const amount = Math.floor(Math.random() * max);
  return amount;
};

const allowChildren = () => {
  if (Math.random() > .5) {
    return true;
  }
  return false;
};

const genOneData = () => ({
  unavailabledates: genDateArray(3, 2018),
  rating: genAmount(6),
  numberofratings: genAmount(200),
  guestmax: genAmount(5),
  cost: genAmount(300),
  minstay: genAmount(3),
  maxstay: genAmount(20),
  childrenallowed: allowChildren(),
});

const genAllData = (start, quantity) => {
  const bookings = [];
  for (let i = start; i < quantity; i += 1) {
    bookings.push(genOneData(i));
  }
  return bookings;
};

exports.genAllData = genAllData;
exports.genOneData = genOneData;
