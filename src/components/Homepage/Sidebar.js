import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Topics</h3>
      <ul>
        <li><a href="/">Topic 1</a></li>
        <li><a href="/">Topic 2</a></li>
        <li><a href="/">Topic 3</a></li>
        <li><a href="/">Topic 4</a></li>
      </ul>
      <div className="ad-section">
        <h4>Advertisement</h4>
        <img src="/images/ad.png" alt="Ad" />
        <p>Ad description goes here.</p>
      </div>
    </div>
  );
};

export default Sidebar;
