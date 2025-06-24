import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './css_files/contacts.css';
import Navbar from '../global/navbar';

function Contacts() {
  const [formData, setFormData] = useState({
    phone: '',
    website: '',
    address: '',
    linkedin: '',
    countryCode: '',
  });

  const navigate = useNavigate();
  const location = useLocation();

  const currentStep = location.pathname;

  const steps = [
    { title: 'Basic Info', path: '/signup' },
    { title: 'Details', path: '/details' },
    { title: 'Documents', path: '/documents' },
    { title: 'Contacts', path: '/contacts' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (e) => {
  e.preventDefault();
  const email = localStorage.getItem('email');
  try {
    const response = await fetch(`http://localhost:5000/api/auth/contacts/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Sign-up complete!');
      navigate('/login');
    } else {
      alert(data.message || 'Failed to save contacts.');
    }
  } catch (error) {
    alert('Server error');
  }
};


  return (
    <>
      <Navbar context="contacts" />
      <div className="signup-page">
        <div className='form-container'>
          <div className="form-content">
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

            <form className="signup-form" onSubmit={handleNext}>
              <h2 className="form-title">Contact Information</h2>

              <div className="form-field">
                <label>Phone Number</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <select name="countryCode" value={formData.countryCode} onChange={handleChange} required>
                    <option value="" disabled></option>
                    <option value="+254">🇰🇪 +254 (Kenya)</option>
                    <option value="+234">🇳🇬 +234 (Nigeria)</option>
                    <option value="+27">🇿🇦 +27 (South Africa)</option>
                    <option value="+20">🇪🇬 +20 (Egypt)</option>
                    <option value="+255">🇹🇿 +255 (Tanzania)</option>
                    <option value="+233">🇬🇭 +233 (Ghana)</option>
                    <option value="+212">🇲🇦 +212 (Morocco)</option>
                    <option value="+256">🇺🇬 +256 (Uganda)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="712345678"
                    pattern="[0-9]{7,12}"
                  />
                </div>
              </div>

              <div className="form-field">
                <label>Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div className="form-field">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="12345 00200 <Zip code>"
                  required
                />
              </div>

              <div className="form-field">
                <label>LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourstartup"
                />
              </div>

              <button type="submit" className="next-button">Next</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacts;
