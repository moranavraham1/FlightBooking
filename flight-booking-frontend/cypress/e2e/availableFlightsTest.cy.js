describe('Flight Booking Test', () => {
    beforeEach(() => {
      // Visit the Flights Page (update the URL if needed)
      cy.visit('http://localhost:3001/flights');
    });
  
    it('should show a success message after booking a flight', () => {
      // Wait for flights to load
      cy.intercept('GET', 'http://localhost:3000/api/flights').as('getFlights');
      cy.wait('@getFlights');
  
      // Ensure flights are available
      cy.get('.flightItem').should('exist');
  
      // Click the first "Book Flight" button
      cy.get('.bookButton').first().click();
  
      // Wait for the booking to be processed
      cy.intercept('POST', 'http://localhost:3000/api/bookings').as('postBooking');
  
      // Check if the booking success message is displayed
      cy.get('.bookingMessage').should('exist');
      cy.get('.bookingMessage').should('contain.text', 'Flight');
    });
  });
  