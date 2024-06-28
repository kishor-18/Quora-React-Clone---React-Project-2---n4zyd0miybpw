import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <h2>Login Page</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
