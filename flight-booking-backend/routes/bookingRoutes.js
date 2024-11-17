const express = require('express');
const sequelize = require('../confing/database');
const { QueryTypes } = require('sequelize');
const router = express.Router();

// Create Bookings table if it doesn't exist
async function createBookingsTable() {
  try {
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "Bookings" (
        id SERIAL PRIMARY KEY,
        "bookingName" VARCHAR(255) UNIQUE NOT NULL,
        "startPoint" VARCHAR(255) NOT NULL,
        "endPoint" VARCHAR(255) NOT NULL,
        "totalPrice" FLOAT NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Bookings table created or already exists');
  } catch (error) {
    console.error('Error creating Bookings table:', error);
  }
}

// Initialize the table
createBookingsTable();

// POST route for creating a booking using raw SQL
router.post('/', async (req, res) => {
  const { bookingName, startPoint, endPoint, totalPrice } = req.body;

  try {
    // Check if booking already exists
    const [existingBooking] = await sequelize.query(`
      SELECT * FROM "Bookings" WHERE "bookingName" = :bookingName
    `, {
      replacements: { bookingName },
      type: QueryTypes.SELECT
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This flight is already booked' });
    }

    // Create new booking
    const [newBooking] = await sequelize.query(`
      INSERT INTO "Bookings" ("bookingName", "startPoint", "endPoint", "totalPrice")
      VALUES (:bookingName, :startPoint, :endPoint, :totalPrice)
      RETURNING *
    `, {
      replacements: { bookingName, startPoint, endPoint, totalPrice },
      type: QueryTypes.INSERT
    });

    res.status(201).json({ 
      message: 'Flight booked successfully!', 
      booking: newBooking[0]
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(400).json({ 
      message: 'Error booking flight', 
      error: error.message 
    });
  }
});

// GET route for retrieving all booked flights using raw SQL
router.get('/', async (req, res) => {
  try {
    const bookings = await sequelize.query(`
      SELECT * FROM "Bookings" 
      
    `, {
      type: QueryTypes.SELECT
    });

    res.json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ 
      message: "Error retrieving booked flights",
      error: error.message 
    });
  }
});

// DELETE route for canceling a booking by flight name using raw SQL
router.delete('/cancel/:flightName', async (req, res) => {
  const { flightName } = req.params;

  try {
    // Check if booking exists before deletion
    const [existingBooking] = await sequelize.query(`
      SELECT * FROM "Bookings" 
      WHERE "bookingName" = :flightName
    `, {
      replacements: { flightName },
      type: QueryTypes.SELECT
    });

    if (!existingBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Delete the booking
    await sequelize.query(`
      DELETE FROM "Bookings" 
      WHERE "bookingName" = :flightName
    `, {
      replacements: { flightName },
      type: QueryTypes.DELETE
    });

    res.json({ 
      message: 'Booking canceled successfully',
      canceledBooking: existingBooking
    });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ 
      message: 'Error canceling the booking',
      error: error.message 
    });
  }
});

module.exports = router;
