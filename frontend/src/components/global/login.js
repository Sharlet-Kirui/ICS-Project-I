import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css_files/login.css';
import Navbar from './navbar';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', formData.email);
        localStorage.setItem('userType', data.userType);

        if (data.userType === 'investor') {
          window.location.href = '/investor/dashboard';
        } else if (data.userType === 'startup') {
          window.location.href = '/dashboard';
        } else {
          alert('Unknown user type');
        }
      } else {
        alert(data.message || 'Invalid credentials');
      }
    } catch (error) {
      alert('Server error');
    }
  };

  return (
    <>
      <Navbar context="login" />
      <div className="login-page">
        <div className="login-form-container">
          <div className="login-form-content">
            <h2 className="form-title">Welcome</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <Link to="/forgot-password" className="forgot-password-link">Forgot password</Link>
              </div>
              <button type="submit" className="next-button">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
