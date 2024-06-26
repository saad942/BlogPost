import React, { useState } from 'react';
import axios from 'axios';
import './loginStyles.css'; // Import CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/user/login', { name: username,  password: password });
      const token = response.data.token;
      const userInfo=response.data.userInfo;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userInfo)); // Store user info as JSON string
      window.location.href = '/home';
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="login-button" type="submit">Login</button>
        <p>if you want to create account <a href='/regestry'>click-me</a></p>
      </form>
    </div>
  );
}

export default Login;
