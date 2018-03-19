CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  unavailableDates TEXT NOT NULL,
  type TEXT NOT NULL,
  rating INT NOT NULL,
  numberOfRatings INT NOT NULL,
  guestMax INT NOT NULL,
  cost INT NOT NULL,
  minStay INT NOT NULL,
  maxStay INT NOT NULL,
  childrenAllowed BOOLEAN NOT NULL
);