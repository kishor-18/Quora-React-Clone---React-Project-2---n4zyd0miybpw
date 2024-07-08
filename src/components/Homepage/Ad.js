import React from 'react';
import './Ad.css';
import bookingImage from '../../Assets/booking.com image.png'; 

const Ad = () => {
  return (
    <div className="advertisement" onClick={() => window.open('https://www.booking.com/')}>
      <img src={bookingImage} alt='Ad' />
      <h2>Booking.com</h2>
      <p>Booking.com is an online travel agency that connects travelers with places to stay, transportation, and experiences.
        It was founded in Amsterdam in 1996 and is a subsidiary of Booking Holdings.</p>
        <footer className='footer'>Advertisement</footer>
    </div>
  );
}

export default Ad;
