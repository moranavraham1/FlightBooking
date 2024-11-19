// models/Booking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize instance

const Booking = sequelize.define('Booking', {
  bookingName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startPoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endPoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.FLOAT,  // Changed to FLOAT in case you need decimal support
    allowNull: false,
  },
}, {
  tableName: 'Bookings', // Ensure the table name is 'Bookings'
  timestamps: false, // Set to false if you don't want 'createdAt' and 'updatedAt'
});

module.exports = Booking;