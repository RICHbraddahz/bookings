const express = require('express');
const nr = require('newrelic');
const mongoose = require('mongoose');
const db = require('../database/MongoDB/index.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

mongoose.connect('mongodb://localhost/seabnb');

const port = 3002;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/bookings/:id', express.static(path.join(__dirname, '/../client')));
app.use('/dist/index_bundle.js', express.static(path.join(__dirname, '/../client/dist/index_bundle.js')));

app.get('/api/bookings/:id', (req, res) => {
  db.Booking.find({ id: req.params.id })
    .exec((err, data) => {
      res.send(data);
    });
});

app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '/../client/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
