const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://myuser:mysecurepassword@postgres:5432/flightbooking', {
    dialect: 'postgres',
    logging: false, 
  });


  async function connectDB() {
    try {
      await sequelize.authenticate();
      console.log('Connected to PostgreSQL successfully!');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  connectDB();

module.exports = sequelize;
