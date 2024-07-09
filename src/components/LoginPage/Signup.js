import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Make sure to import the CSS file

const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const header = { projectID: "vmyitayk3fnu", 'Content-Type': 'application/json' };
  const options = {
    method: "POST",
    headers: header,
    body: JSON.stringify({
      name: firstName + " " + lastName,
      email: email,
      password: password,
      appType: 'quora'
    }),
  };

  async function fetchRegister(event) {
    event.preventDefault();

    try {
      let response = await fetch('https://academics.newtonschool.co/api/v1/bookingportals/signup', options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await response.json();

      setUser({ isLoggedIn: true, email: data.email, firstName: firstName }); // Update central state
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      alert("Registered successfully");
      navigate('/');
    } catch (error) {
      alert("Not Registered");
      console.error('Error:', error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchRegister(event);
  }

  return (
    <div className="signup-body">
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Firstname:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Lastname:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button className="signup-button" type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup;
