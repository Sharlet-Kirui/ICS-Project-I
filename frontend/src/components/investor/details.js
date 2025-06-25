// frontend/src/components/investor/details.js
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './css_files/details.css';
import Navbar from '../global/navbar';

function InvestorDetails() {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    country: '',
    city: '',
    investmentRange: '',
    industry: '',
    valueOffered: '',
    fundingAmount: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const currentStep = location.pathname;

  const steps = [
    { title: 'Basic Info', path: '/investor/signup' },
    { title: 'Details', path: '/investor/details' },
    { title: 'Documents', path: '/investor/documents' },
    { title: 'Contacts', path: '/investor/contacts' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('investorEmail');

    try {
      const response = await fetch(`http://localhost:5000/api/auth/investor-details/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/investor/documents');
      } else {
        alert(data.message || 'Failed to save details.');
      }
    } catch (error) {
      alert('Server error');
    }
  };

  return (
    <>
      <Navbar context="details" />
      <div className="signup-page">
        <div className="form-container">
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
              <h2 className="form-title">Investor Details</h2>

              <div className="form-field">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Job Title</label>
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Country</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Investment Range</label>
                <input type="text" name="investmentRange" value={formData.investmentRange} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Industry</label>
                <input type="text" name="industry" value={formData.industry} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Value Offered</label>
                <select name="valueOffered" value={formData.valueOffered} onChange={handleChange} required>
                  <option value="" disabled>Select</option>
                  <option value="Funding">Funding</option>
                  <option value="Advisory">Advisory</option>
                  <option value="Network">Network</option>
                  <option value="Mentorship">Mentorship</option>
                </select>
              </div>

              {formData.valueOffered === 'Funding' && (
                <div className="form-field">
                  <label>Funding Amount Willing to Offer</label>
                  <input type="number" name="fundingAmount" value={formData.fundingAmount} onChange={handleChange} />
                </div>
              )}

              <button type="submit" className="next-button">Next</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvestorDetails;
