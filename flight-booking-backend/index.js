const express = require('express');
const sequelize = require('./config/database'); // Sequelize instance
const cors = require('cors');
const flightRoutes = require('./routes/flightroutes');
const bookingRoutes = require('./routes/bookingRoutes');
const Flight = require('./models/Flight'); // Import Flight model
const Booking = require('./models/Booking'); // Import Booking model

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

// PostgreSQL Connection and Sync
sequelize.authenticate()
  .then(() => {
    console.log('Connected to PostgreSQL');
    // Synchronize models (creates tables if they don't exist)
    return sequelize.sync({ force: false }); // Set force: true to drop and recreate tables
  })
  .then(async () => {
    console.log('Database synchronized');

    try {
      // Reset the database and create necessary tables
      await sequelize.sync({ force: true });
      console.log('Tables created: flights and bookings');
      
      // Define sample flight data to populate the database
      const sampleFlights = [
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

      // Populate the database with sample flight data, ensuring no duplicates
      for (const flight of sampleFlights) {
        const [newFlight, created] = await Flight.findOrCreate({
          where: { name: flight.name },
          defaults: flight,
        });

        console.log(created ? `Flight ${flight.name} created.` : `Flight ${flight.name} already exists.`);
      }

      console.log('Seeding completed!');
    } catch (error) {
      // Handle errors during table creation or data seeding
      console.error('Error creating tables and seeding data:', error);
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL or syncing models:', err);
  });
