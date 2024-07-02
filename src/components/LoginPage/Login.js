import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const header = { projectID: "vmyitayk3fnu", 'Content-Type': 'application/json' };
  const options = {
      method: "POST",
      headers: header,
      body: JSON.stringify({
          email: email,
          password: password,
          appType: 'quora'
      }),
  };

  async function fetchLogin(event) {
    event.preventDefault();

    try {
        let response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/login', options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log('API Response:', data);
        setEmail('');
        setPassword('');
        if (data.status === "success") {
            alert("Login successful");
            setUser({ email: data.email, isLoggedIn: true }); // Pass user data to the central state
            const redirectPath = location.state?.from || "/";
            navigate(redirectPath); 
        } 
    } catch (error) {
        alert("Login failed. Please try again.");
        console.error('Error:', error);
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="quora-logo">Quora</h1>
        <p className="tagline">A place to share knowledge and better understand the world</p>
        <form onSubmit={fetchLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input 
              type="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="social-login">
          <button className="social-btn google-btn">Continue with Google</button>
          <button className="social-btn facebook-btn">Continue with Facebook</button>
        </div>
        <p className="signup-link" onClick={() => navigate('/signup')}>Sign up with email</p>
      </div>
    </div>
  );
};

export default Login;
