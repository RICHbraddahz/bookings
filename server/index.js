const express = require('express');
const db = require('../database/MongoDB');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = 3002;
const app = express();
console.log(path.join(__dirname, '/../client/dist'));
app.use('/bookings/:id', express.static(path.join(__dirname, '/../client')));
// app.use('/', express.static(path.join(__dirname, '/../client/dist/bundle.js')));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/bookings/:id', function (req, res) {
  let cb = function (data) {
    res.send(data);
  }
  db.find(req.params.id, cb);
});

app.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, '/../client/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});