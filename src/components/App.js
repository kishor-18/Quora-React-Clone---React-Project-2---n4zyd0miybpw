import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Homepage/Navbar";
import Login from "./LoginPage/Login";
import ProfileSettings from "./LoginPage/ProfileSettings";
import Question from "./Homepage/Question";
import Posts from "./Homepage/Posts";

function App() {
  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<>
            <Question />
            <Posts />
          </>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile-settings" element={<ProfileSettings />} />
        </Routes>
    </Router>
  );
}

export default App;
