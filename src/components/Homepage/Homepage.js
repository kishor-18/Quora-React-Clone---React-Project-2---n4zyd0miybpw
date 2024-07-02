import React from 'react';
import Navbar from './Navbar';
import Question from './Question';
import Sidebar from './Sidebar';
import Posts from './Posts';
import Ad from './Ad';
import './Homepage.css';
import './Sidebar.css';
import './Question.css';
import './Posts.css';
import '../../styles/App.css';

const Homepage = ({ user, setUser }) => {
  return (
    <div className="container">
      <Navbar user={user} setUser={setUser} className="navbar" />
      <Sidebar user={user} setUser={setUser} className="sidebar" />
      <Question user={user} setUser={setUser} className="question" />
      <Posts user={user} setUser={setUser} className="posts" />
      <Ad className="advertisement" />
    </div>
  );
};

export default Homepage;
