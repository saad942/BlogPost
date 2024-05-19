import React, { useState } from 'react';
import axios from 'axios';
import './loginStyles.css'; // Import CSS file

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/user/register', { name: username, email: email, password: password });
      if (response.data.status === 'success') {
        window.location.href = '/'; // Redirect to homepage on successful registration
      } else {
        setError('Something went wrong'); // Set error message if registration was unsuccessful
      }
    } catch (error) {
      setError('An error occurred'); // Set error message if an unexpected error occurred
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Register</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input className="login-input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input className="login-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="login-button" type="submit">Create Account</button>
      </form>
      <p>Already have an account? <a href='/login'>Login here</a></p>
    </div>
  );
}

export default Login;
