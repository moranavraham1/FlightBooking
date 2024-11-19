const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Flight extends Model {}

Flight.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  departure: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Flight',
  tableName: 'Flights',
  timestamps: false,
  schema: 'public'
});

module.exports = Flight;