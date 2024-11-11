// models/Flight.js
const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  name: String,
  departure: String,
  destination: String,
  price: Number,
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
