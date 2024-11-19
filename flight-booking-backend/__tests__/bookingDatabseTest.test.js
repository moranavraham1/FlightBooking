const Booking = require('../models/Booking'); // Import the Booking model
const sequelize = require('../config/database'); // Import the Sequelize instance

// Mock test to add and delete a booking
describe('Booking Model Test', () => {
  // Setup: Ensure the database is connected and clean before each test
  beforeAll(async () => {
    // Sync the database
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    // Close the database connection after all tests
    await sequelize.close();
  });

  it('should create and delete a booking', async () => {
    // Step 1: Create a mock booking
    const mockBooking = {
      bookingName: 'John Doe',
      startPoint: 'New York',
      endPoint: 'London',
      totalPrice: 500.75
    };

    // Step 2: Insert the mock booking into the database
    const booking = await Booking.create(mockBooking);

    // Step 3: Verify the booking is added to the database
    const foundBooking = await Booking.findOne({ where: { bookingName: 'John Doe' } });
    expect(foundBooking).toBeTruthy();
    expect(foundBooking.bookingName).toBe('John Doe');
    expect(foundBooking.startPoint).toBe('New York');
    expect(foundBooking.endPoint).toBe('London');
    expect(foundBooking.totalPrice).toBe(500.75);

    // Step 4: Delete the booking
    await booking.destroy();

    // Step 5: Verify the booking is deleted
    const deletedBooking = await Booking.findOne({ where: { bookingName: 'John Doe' } });
    expect(deletedBooking).toBeNull();
  });
});
