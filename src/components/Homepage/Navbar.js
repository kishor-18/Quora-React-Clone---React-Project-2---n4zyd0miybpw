import React, { useState } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Navbar.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import AddPost from './Addpost';
import TryQuoraPlus from './TryQuoraPlus';  

const Navbar = ({ user, setUser, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuoraPlusModalOpen, setIsQuoraPlusModalOpen] = useState(false); // New state
  const [searchInput, setSearchInput] = useState('');

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTryQuoraPlusClick = () => {
    if (!user.isLoggedIn) {
      alert('Please log in to try Quora+');
      return;
    }
    setIsQuoraPlusModalOpen(true); // Open the modal
  };

  const handleAddQuestionClick = () => {
    if (!user.isLoggedIn) {
      alert('Please log in to add a question');
      return;
    }
    toggleModal();
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <div className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Link to="/" className="logo">Quora</Link>
      <nav className="navbar-nav">
        <ul>
          <li>
            <Link to="/" className={getNavLinkClass('/')}>
              <i className="fa-solid fa-house"></i>
            </Link>
          </li>
          <li>
            <Link to="/following" className={getNavLinkClass('/following')}>
              <i className="fa-solid fa-user-group"></i>
            </Link>
          </li>
          <li>
            <Link to="/answers" className={getNavLinkClass('/answers')}>
              <i className="fa-solid fa-pen-to-square"></i>
            </Link>
          </li>
          <li>
            <Link to="/spaces" className={getNavLinkClass('/spaces')}>
              <i className="fa-solid fa-people-group"></i>
            </Link>
          </li>
          <li>
            <Link to="/" className={getNavLinkClass('/notifications')}>
              <i className="fa-solid fa-bell"></i>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="navbar-right">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          className="navbar-search"
          type="text"
          placeholder="Search Quora"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
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
                <button onClick={() => navigate('/login', { state: { isDarkMode } })}>Login</button>
              )}
              <button onClick={toggleTheme}>Toggle Dark Mode</button>
            </div>
          )}
        </div>
        <button className="try-quora-plus" onClick={handleTryQuoraPlusClick}>Try Quora+</button>
        <button className="add-question" onClick={handleAddQuestionClick}>Add question</button>
      </div>
      {isModalOpen && <AddPost isOpen={isModalOpen} onRequestClose={toggleModal} />}
      {isQuoraPlusModalOpen && <TryQuoraPlus isOpen={isQuoraPlusModalOpen} onRequestClose={() => setIsQuoraPlusModalOpen(false)} />}
    </div>
  );
};

export default Navbar;
