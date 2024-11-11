describe('Booking Cancellation Test', () => {
    beforeEach(() => {
      // Visit the My Bookings Page (update the URL if needed)
      cy.visit('http://localhost:3001/my-bookings');
    });
  
    it('should show a success message after canceling a booking', () => {
      // Wait for bookings to load
      cy.intercept('GET', 'http://localhost:3000/api/bookings').as('getBookings');
      cy.wait('@getBookings');
  
      // Ensure booked flights are available
      cy.get('.booked-flight-item').should('exist');
  
      // Click the first "Cancel Booking" button
      cy.get('.deleteButton').first().click();
  
      // Wait for the cancellation request to be processed
      cy.intercept('DELETE', 'http://localhost:3000/api/bookings/cancel/*').as('cancelBooking');
  
      // Check if the cancellation success message is displayed
      cy.get('.cancelMessage').should('exist');
      cy.get('.cancelMessage').should('contain.text', 'Booking for');
    });
  });
  