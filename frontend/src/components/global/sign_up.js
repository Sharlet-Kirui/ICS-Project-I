import React, { useState } from 'react';
import './css_files/sign_up.css';

function SignUp() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert('Error connecting to server');
    }
  };

  return (
    <div className="signup-page">
      {/* Progress Steps */}
      <div className="progress-container">
        <div className="progress-step active">
          <span className="step-title">Basic Info</span>
          <div className="step-indicator active"></div>
        </div>
        <div className="progress-step">
          <span className="step-title">Details</span>
          <div className="step-indicator"></div>
        </div>
        <div className="progress-step">
          <span className="step-title">Documents</span>
          <div className="step-indicator"></div>
        </div>
        <div className="progress-step">
          <span className="step-title">Review</span>
          <div className="step-indicator"></div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="form-container">
        <div className="form-content">
          
          {/* Form Title */}
          <h2 className="form-title">Basic Info</h2>
          
          {/* Sign-up Form */}
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Company Name</label>
              <input 
                type="text"
                name="companyName" 
                value={formData.companyName}
                onChange={handleChange} 
                required 
              />
            </div>

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
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword}
                onChange={handleChange} 
                required 
              />
            </div>

            <button type="submit" className="next-button">Next</button>
          </form>

          {/* Progress Bar at Bottom */}
          <div className="bottom-progress-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;