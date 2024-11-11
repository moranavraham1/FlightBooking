import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlightsPage.css';

const FlightsPage = ({ onBooking }) => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [searchFilters, setSearchFilters] = useState({
    departure: '',
    destination: '',
    maxPrice: ''
  });
  const [bookingMessage, setBookingMessage] = useState(''); // הודעה לאחר הזמנה מוצלחת
  const [bookedFlightId, setBookedFlightId] = useState(null); // Track the booked flight's ID

  // Function to fetch available flights (excluding booked ones)
  const fetchFlights = () => {
    axios.get('http://localhost:3000/api/flights')
      .then(response => {
        setFlights(response.data);
        setFilteredFlights(response.data); // Display all flights on initial load
      })
      .catch(error => console.error("There was an error fetching flights!", error));
  };

  // Load flights initially
  useEffect(() => {
    fetchFlights();
  }, []);

  const handleBooking = (flight) => {
    setBookedFlightId(flight._id); // Set the current flight being booked

    axios.post('http://localhost:3000/api/bookings', { 
      bookingName: flight.name,
      startPoint: flight.departure,
      endPoint: flight.destination,
      totalPrice: flight.price
    })
    .then(() => {
      onBooking(flight); // Update MyBookingsPage
      // Refresh the flight list to remove the booked flight
      setFilteredFlights(prevFlights => prevFlights.filter(f => f._id !== flight._id));
      // Close the booking message after 5 seconds
      setTimeout(() => {
        setBookingMessage('');
        setBookedFlightId(null); // Allow re-booking after message is closed
      }, 5000);
    })
    .catch(() => {
      setBookingMessage(`Flight ${flight.name} has been successfully booked!`);
      setTimeout(() => {
        setBookingMessage('');
        fetchFlights();
        setBookedFlightId(null); // Allow re-booking after message is closed
      }, 1000);
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    setFilteredFlights(flights.filter(flight => {
      const matchesDeparture = searchFilters.departure === '' || flight.departure.toLowerCase().includes(searchFilters.departure.toLowerCase());
      const matchesDestination = searchFilters.destination === '' || flight.destination.toLowerCase().includes(searchFilters.destination.toLowerCase());
      const matchesPrice = searchFilters.maxPrice === '' || flight.price <= parseFloat(searchFilters.maxPrice);

      return matchesDeparture && matchesDestination && matchesPrice;
    }));
  };

  return (
    <div className="container">
      <h1 className="heading">Available Flights</h1>

      {/* Search Form */}
      <div className="searchForm">
        <input
          type="text"
          name="departure"
          placeholder="Departure"
          value={searchFilters.departure}
          onChange={handleInputChange}
          className="searchInput"
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={searchFilters.destination}
          onChange={handleInputChange}
          className="searchInput"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price ($)"
          value={searchFilters.maxPrice}
          onChange={handleInputChange}
          className="searchInput"
          step="50"
          min="0"
        />
        <button onClick={applyFilters} className="filterButton">Apply Filters</button>
      </div>

      {/* Booking Message */}
      {bookingMessage && <p className="bookingMessage">{bookingMessage}</p>}

      {filteredFlights.length > 0 ? (
        <div className="flightsList">
          {filteredFlights.map(flight => (
            <div key={flight._id} className="flightItem">
              <div className="flightDetailsWrapper">
                <div>
                  <h3 className="flightName">{flight.name}</h3>
                  <p className="flightDetails">From: {flight.departure} to {flight.destination}</p>
                </div>
                <div className="priceTag">
                  ${flight.price.toFixed(2)}
                </div>
              </div>
              <button 
                onClick={() => handleBooking(flight)} 
                className="bookButton" 
                disabled={bookedFlightId === flight._id || bookingMessage} // Disable button if the flight is already booked or message is shown
              >
                Book Flight
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="noFlightsText">No flights available.</p>
      )}
    </div>
  );
};

export default FlightsPage;
