import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Login from './LoginPage/Login';
import ProfileSettings from "./LoginPage/ProfileSettings";
import Signup from './LoginPage/Signup';

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, email: '', firstName: '' });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
