import React from 'react';
import './Sidebar.css';

const Sidebar = ({ user, setUser }) => {
  const handleSidebarClick = (action) => {
    if (!user.isLoggedIn) {
      alert('Please log in to ' + action);
    } else {
      // Perform the action (create space, access topics)
      console.log(`User is performing action: ${action}`);
    }
  };

  return (
    <div className="sidebar">
      <h3 onClick={() => handleSidebarClick('create space')}>+ Create Space</h3>
      <ul>
        <li><a href="#" onClick={() => handleSidebarClick('access Food Therapy')}>Food Therapy </a></li>
        <li><a href="#" onClick={() => handleSidebarClick('access Entrepreneurship Ideas')}>Entrepreneurship Ideas </a></li>
        <li><a href="#" onClick={() => handleSidebarClick('access Business Ideas')}>Business Ideas </a></li>
        <li><a href="#" onClick={() => handleSidebarClick('access Trending on social media')}>Trending on social media </a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
