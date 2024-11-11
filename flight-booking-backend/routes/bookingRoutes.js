const express = require('express');
const Booking = require('../models/Booking'); // Import the Booking model
const router = express.Router();

// POST route for creating a booking
router.post('/', (req, res) => {
  const { bookingName, startPoint, endPoint, totalPrice } = req.body;

  // Create a new booking document
  const newBooking = new Booking({
    bookingName,
    startPoint,
    endPoint,
    totalPrice,
  });

  // Save the new booking to the database
  newBooking.save()
    .then(() => res.status(201).json({ message: 'Flight booked successfully!' }))
    .catch((err) => res.status(400).json({ error: 'Error booking flight', details: err }));
});

// GET route for retrieving all booked flights
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving booked flights" });
  }
});

// DELETE route for canceling a booking by flight name
router.delete('/cancel/:flightName', async (req, res) => {
  try {
    const flightName = req.params.flightName; // Get the flight name from the URL parameter

    // Find and delete the booking with the matching flight name
    const canceledBooking = await Booking.findOneAndDelete({ bookingName: flightName });

    if (!canceledBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Respond with success message
    res.status(200).json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error canceling the booking' });
  }
});

module.exports = router;
