CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  unavailabledates TEXT NOT NULL,
  rating INT NOT NULL,
  numberofratings INT NOT NULL,
  guestmax INT NOT NULL,
  cost INT NOT NULL,
  minstay INT NOT NULL,
  maxstay INT NOT NULL,
  childrenallowed BOOLEAN NOT NULL
);