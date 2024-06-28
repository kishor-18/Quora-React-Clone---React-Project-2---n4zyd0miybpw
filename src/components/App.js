import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Homepage/Navbar";
import Login from "./LoginPage/Login";
import ProfileSettings from "./LoginPage/ProfileSettings";
import Question from "./Homepage/Question";


function App() {
  return <div>
    < Router>
      <Navbar/>
  
    <Routes>
      <Route path="/navbar" element={<Question />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile-settings" element={<ProfileSettings />} />
    </Routes>
    </Router>
  </div>;
}

export default App;
