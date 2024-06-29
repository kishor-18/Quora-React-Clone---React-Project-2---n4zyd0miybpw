import React, { useState } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Navbar.css';
import Question from './Question';
import Posts from './Posts';
import { useNavigate } from 'react-router-dom';

const navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    navigate('/login');
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (<>
  <div>
    <div className="navbar">
      <a href="/" className="logo">Quora</a>
      <nav className="navbar-nav">
        <ul>
          <li><a href="/home"><i className="fa-solid fa-house"></i></a></li>
          <li><a href="/following"><i className="fa-solid fa-question"></i></a></li>
          <li><a href="/answers"><i className="fa-solid fa-pen-to-square"></i></a></li>
          <li><a href="/spaces"><i className="fa-solid fa-user-group"></i></a></li>
          <li><a href="/notifications"><i className="fa-solid fa-bell"></i></a></li>
        </ul>
      </nav>
      <div className="navbar-right">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input className="navbar-search" type="text" placeholder="Search Quora" />
        <div className="user-menu" onClick={toggleDropdown}>
          <i className="fa-solid fa-user"></i> <span></span>
          {isDropdownOpen && (
            <div className="dropdown">
              {isLoggedIn ? (
                <>
                  <a href="/profile-settings">Profile Settings</a>
                  <button onClick={toggleLogin}>Logout</button>
                </>
              ) : (
                <a href="/login">Login</a>
              )}
              <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
            </div>
          )}
        </div>
        <button className="try-quora-plus">Try Quora+</button>
        <button className="add-question">Add question</button>
      </div>
    </div>
    < Question />
    < Posts />
    </div>
    </>);
};

export default navbar;
