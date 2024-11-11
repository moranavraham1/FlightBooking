const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const flightRoutes = require('./routes/flightroutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = 3000;

mongoose.set('strictQuery', false);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

// MongoDB Connection
mongoose.connect('mongodb://mongodb:27017/flightbooking', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
