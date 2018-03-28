require('newrelic');
const express = require('express');
const MongoClient = require('mongodb');
const cors = require('cors');
const redis = require('redis');
const bluebird = require('bluebird');
const db = require('../../database/MongoDB/index.js');
// const path = require('path');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
const redisClient = redis.createClient();


const port = 3002;
const app = express();

redisClient.on('error', (err) => {
  console.log(err);
});

const getDescriptionById = (collection, id) => collection.findOne({ id: parseInt(id, 10) });

const getData = async (id, mongoClient, redisClient) => {
  let cachedResult = await redisClient.getAsync(id);

  if (cachedResult) {
    return JSON.parse(cachedResult);
  }

  const db = mongoClient.db('seabnb');
  const collection = db.collection('bookings');

  let result = await getDescriptionById(collection, id);
  redisClient.setAsync(id, JSON.stringify(result));
  return result;
};

MongoClient.connect('mongodb://localhost/seabnb')
  .then((mongoClient) => {
    app.use(cors());

    app.use('/bookings/:id', async (req, res) => {
      const { id } = req.params;
      const data = await getData(id, mongoClient, redisClient);
      res.send(data);
    });

    app.get('/booking/:id', async (req, res) => {
      const { id } = req.params;
      const data = await getData(id, mongoClient, redisClient);
      res.send(data);
    });

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });

// app.use('/bookings/:id', express.static(path.join(__dirname, '/../../client')));

// app.get('/booking/:id', (req, res) => {
//   db.Booking.find({ id: req.params.id })
//     .exec((err, data) => {
//       res.send(data);
//     });
// });




// app.get('/*', (req, res, next) => {
//   res.sendFile(path.join(__dirname, '/../../client/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// });

// app.listen(port, () => {
//   console.log(`listening on port ${port}`);
// });
