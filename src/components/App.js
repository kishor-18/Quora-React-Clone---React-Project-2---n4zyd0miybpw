import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Homepage/Navbar";
import Login from "./LoginPage/Login";
import ProfileSettings from "./LoginPage/ProfileSettings";
import Sidebar from "./Homepage/Sidebar";
import Posts from "./Homepage/Posts";
import Question from "./Homepage/Question";
import Ad from "./Homepage/Ad";
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Sidebar />
        <Question />
        <Posts />
        <Ad />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
