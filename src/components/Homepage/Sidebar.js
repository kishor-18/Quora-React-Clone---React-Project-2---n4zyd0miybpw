import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>+ Create Space</h3>
      <ul>
        <li><a href="/">Food Therapy </a></li>
        <li><a href="/">Entrepreneurship Ideas </a></li>
        <li><a href="/">Business Ideas </a></li>
        <li><a href="/">Trending on social media </a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
