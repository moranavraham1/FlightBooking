const express = require('express');
const sequelize = require('./confing/database'); // Sequelize instance
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
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL or syncing models:', err);
  });
