import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyBookingsPage.css';

const MyBookingsPage = () => {
  const [bookedFlights, setBookedFlights] = useState([]);
  const [cancelMessage, setCancelMessage] = useState(''); // State for success message

  const fetchBookings = () => {
    axios.get('http://localhost:3000/api/bookings')
      .then(response => setBookedFlights(response.data))
      .catch(error => console.error("There was an error fetching bookings!", error));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = (flightName) => {
    axios.delete(`http://localhost:3000/api/bookings/cancel/${flightName}`)
      .then(() => {
        setCancelMessage(`Booking for ${flightName} has been canceled successfully!`);
        fetchBookings();
        // Hide the success message after 3 seconds
        setTimeout(() => {
          setCancelMessage('');
        }, 3000);
      })
      .catch(error => console.error("There was an error canceling the booking!", error));
  };

  return (
    <div className="myBookingsContainer">
      <h1>My Booked Flights</h1>
      
      {/* Success Message */}
      {cancelMessage && <p className="cancelMessage">{cancelMessage}</p>}

      <div className="bookingsList">
        {bookedFlights.length > 0 ? (
          bookedFlights.map(booking => (
            <div key={booking._id} className="booked-flight-item">
              <h3>{booking.bookingName}</h3>
              <p>{booking.startPoint} to {booking.endPoint}</p>
              <p>Price: ${booking.totalPrice.toFixed(2)}</p>
              <button onClick={() => handleDelete(booking.bookingName)} className="deleteButton">
                Cancel Booking
              </button>
            </div>
          ))
        ) : (
          <p>You have no bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
