import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './css_files/sign_up.css';
import Navbar from './navbar';

function SignUp() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  const currentStep = location.pathname; // e.g., '/signup'

  const steps = [
    { title: 'Basic Info', path: '/signup' },
    { title: 'Details', path: '/details' },
    { title: 'Documents', path: '/documents' },
    { title: 'Contacts', path: '/contacts' }
  ];

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

      if (response.ok) {
        navigate('/details');
      }
    } catch (error) {
      alert('Error connecting to server');
    }
  };

  return (
    <>
      <Navbar context="signup" />
      <div className="signup-page">
      <div className="form-container">
        <div className="form-content">
          {/* Progress Container inside C1DCDC background */}
          <div className="progress-container">
            {steps.map((step, index) => {
              const isActive = currentStep === step.path;
              const isCompleted = steps.findIndex(s => s.path === currentStep) > index;
              return (
                <Link
                  key={step.path}
                  to={step.path}
                  className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                >
                  <span className="step-title">{step.title}</span>
                  <div className={`step-indicator ${isActive || isCompleted ? 'active' : ''}`}></div>
                </Link>
              );
            })}
          </div>

          <h2 className="form-title">Basic Info</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            {/* form fields... */}
            <div className="form-field">
              <label>Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <button type="submit" className="next-button">Next</button>
          </form>

        </div>
      </div>
    </div>
    </>
  );
}

export default SignUp;
