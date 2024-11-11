const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

// Array of flights to seed the database with unique names and routes
const flights = [
  { name: "Orion Express", departure: "London", destination: "Dubai", price: 320, airline: "El Al" },
  { name: "Starlight Voyage", departure: "Toronto", destination: "Tokyo", price: 780, airline: "Arkia" },
  { name: "Aurora Wings", departure: "Sydney", destination: "Bangkok", price: 250, airline: "Israir" },
  { name: "Celestial Soar", departure: "Cape Town", destination: "Lisbon", price: 600, airline: "El Al" },
  { name: "Voyager Skies", departure: "Singapore", destination: "Amsterdam", price: 550, airline: "Arkia" },
  { name: "Luna Jet", departure: "Mumbai", destination: "Los Angeles", price: 920, airline: "Israir" },
  { name: "Eclipse Air", departure: "Beijing", destination: "Auckland", price: 710, airline: "El Al" },
  { name: "Galaxy Cruiser", departure: "Moscow", destination: "Helsinki", price: 340, airline: "Arkia" },
  { name: "Starliner", departure: "Rio de Janeiro", destination: "Buenos Aires", price: 200, airline: "Israir" },
  { name: "Cosmic Breeze", departure: "Cairo", destination: "Istanbul", price: 180, airline: "El Al" }
];

// Function to seed flights if the collection is empty
async function seedFlights() {
  const count = await Flight.countDocuments();
  if (count === 0) {
    await Flight.insertMany(flights);
    console.log('Flight data seeded successfully.');
  }
}

// Run the seed function once when this module loads
seedFlights();

// GET route for available flights (excluding booked flights)
router.get('/', async (req, res) => {
  try {
    // Get all booked flight names
    const bookedFlights = await Booking.find().select('bookingName');
    const bookedFlightNames = bookedFlights.map(booking => booking.bookingName);

    // Find flights not in the booked flight list
    const availableFlights = await Flight.find({ name: { $nin: bookedFlightNames } });
    
    res.json(availableFlights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving available flights" });
  }
});

module.exports = router;
