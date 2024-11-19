const express = require('express');
const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');
const router = express.Router();

// GET route for available flights (excluding booked flights)
router.get('/', async (req, res) => {
  try {
    // Get all booked flight names
    const [bookedFlights] = await sequelize.query('SELECT "bookingName" FROM "Bookings"');
    const bookedFlightNames = bookedFlights.map(booking => booking.bookingName);

    // Query to find available flights using raw SQL
    let query = 'SELECT * FROM "Flights"';
    
    if (bookedFlightNames.length > 0) {
      query += ' WHERE name NOT IN (:bookedFlightNames)';
    }

    const availableFlights = await sequelize.query(query, {
      replacements: { bookedFlightNames },
      type: QueryTypes.SELECT
    });

    res.json(availableFlights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving available flights" });
  }
});

module.exports = router;