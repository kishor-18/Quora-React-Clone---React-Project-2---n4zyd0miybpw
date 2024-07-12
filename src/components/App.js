import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage/Homepage';
import Login from './LoginPage/Login';
import ProfileSettings from "./LoginPage/ProfileSettings";
import Signup from './LoginPage/Signup';
import Addpost from './Homepage/Addpost';
import Answers from './AnswersPage/Answers';
import Spaces from './SpacesPage/Spaces';
import Following from './FollowingPage/Following';

function App() {
  const [user, setUser] = useState({ isLoggedIn: false, email: '', firstName: '' });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/addpost" element={<Addpost user={user} setUser={setUser} />} />
        <Route path="/answers" element={<Answers user={user} setUser={setUser} />} />
        <Route path="/spaces" element={<Spaces user={user} setUser={setUser} />} />
        <Route path="/following" element={<Following user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
