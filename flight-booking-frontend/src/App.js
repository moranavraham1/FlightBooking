import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightsPage from './FlightsPage';
import MyBookingsPage from './MyBookingsPage';
import './index.css';
import backgroundImage from './m.jpg'; // Import the background image

const App = () => {
  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: `url(${backgroundImage})`, // Apply the background image
          backgroundSize: 'cover', // Ensure the image covers the entire area
          backgroundPosition: 'center', // Center the image
          minHeight: '100vh', // Ensure the background covers the full viewport height
        }}
      >
        {/* Navbar */}
        <h1 className="text-center text-white py-4" style={{ fontSize: '3rem' }}>
  <br />
 
  Flight Booking App
</h1>


        {/* Button-like Navigation Links */}
        <div className="button-container text-center">
          <Link to="/flights" className="button text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Available Flights</Link>
          <Link to="/my-bookings" className="button text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">My Bookings</Link>
          <Link to="/" className="button text-white px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Home</Link>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          {/* Add your home route or default content here */}
          <Route 
            path="/" 
            element={
              <div className="text-center py-16 pb-24 text-white">
                <div className="inline-block text-4xl font-extrabold mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 to-purple-600 animate-pulse tracking-wide">
                  </span>
                </div>
                <div>
                  <span className="text-6xl"></span>
                </div>
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
