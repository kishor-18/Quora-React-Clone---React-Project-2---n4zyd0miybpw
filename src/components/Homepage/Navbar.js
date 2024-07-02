import React, { useState } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Navbar.css';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogoutClick = () => {
    setUser({ isLoggedIn: false, email: '', firstName: '' });
    navigate('/');
  };

  const handleProfileSettingsClick = () => {
    navigate('/profile-settings');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Link to="/" className="logo">Quora</Link>
      <nav className="navbar-nav">
        <ul>
          <li><Link to="/home"><i className="fa-solid fa-house"></i></Link></li>
          <li><Link to="/following"><i className="fa-solid fa-user-friends"></i></Link></li>
          <li><Link to="/answers"><i className="fa-solid fa-pen-to-square"></i></Link></li>
          <li><Link to="/spaces"><i className="fa-solid fa-user-group"></i></Link></li>
          <li><Link to="/notifications"><i className="fa-solid fa-bell"></i></Link></li>
        </ul>
      </nav>
      <div className="navbar-right">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input className="navbar-search" type="text" placeholder="Search Quora" />
        <div className="user-menu" onClick={toggleDropdown}>
          <i className="fa-solid fa-user"></i>
          {isDropdownOpen && (
            <div className="dropdown">
              {user.isLoggedIn ? (
                <>
                  <p>Hello, {user.firstName}</p>
                  <button onClick={handleProfileSettingsClick}>Profile Settings</button>
                  <button onClick={handleLogoutClick}>Logout</button>
                </>
              ) : (
                <button onClick={() => navigate('/login')}>Login</button>
              )}
              <button onClick={toggleTheme}>Toggle Dark Mode</button>
            </div>
          )}
        </div>
        <button className="try-quora-plus">Try Quora+</button>
        <button className="add-question">Add question</button>
      </div>
    </div>
  );
};

export default Navbar;
