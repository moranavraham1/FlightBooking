const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingName: String, 
  startPoint: String, 
  endPoint: String, 
  totalPrice: Number, 
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
