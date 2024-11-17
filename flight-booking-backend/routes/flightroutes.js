const express = require('express');
const sequelize = require('../confing/database');
const { QueryTypes } = require('sequelize');
const router = express.Router();

// Array of flights to seed
const flights = [
  { name: "Orion Express", departure: "London", destination: "Dubai", price: 320 },
  { name: "Starlight Voyage", departure: "Toronto", destination: "Tokyo", price: 780 },
  { name: "Aurora Wings", departure: "Sydney", destination: "Bangkok", price: 250 },
  { name: "Celestial Soar", departure: "Cape Town", destination: "Lisbon", price: 600 },
  { name: "Voyager Skies", departure: "Singapore", destination: "Amsterdam", price: 550 },
  { name: "Luna Jet", departure: "Mumbai", destination: "Los Angeles", price: 920 },
  { name: "Eclipse Air", departure: "Beijing", destination: "Auckland", price: 710 },
  { name: "Galaxy Cruiser", departure: "Moscow", destination: "Helsinki", price: 340 },
  { name: "Starliner", departure: "Rio de Janeiro", destination: "Buenos Aires", price: 200 },
  { name: "Cosmic Breeze", departure: "Cairo", destination: "Istanbul", price: 180 }
];

// Function to seed flights if the collection is empty
async function seedFlights() {
  try {
    // Create the Flights table if it doesn't exist
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS "Flights" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        departure VARCHAR(255) NOT NULL,
        destination VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL
      )
    `);

    // Check if there are any flights
    const [results] = await sequelize.query(
      'SELECT COUNT(*) as count FROM "Flights"',
      { type: QueryTypes.SELECT }
    );
    
    if (parseInt(results.count) === 0) {
      // Insert flights using raw SQL
      for (const flight of flights) {
        await sequelize.query(`
          INSERT INTO "Flights" (name, departure, destination, price)
          VALUES (:name, :departure, :destination, :price)
          ON CONFLICT (name) DO NOTHING
        `, {
          replacements: flight,
          type: QueryTypes.INSERT
        });
      }
      console.log('Flight data seeded successfully.');
    } else {
      console.log('Flights table already has data, skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding flights:', error);
  }
}

// Run the seed function
seedFlights();

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
