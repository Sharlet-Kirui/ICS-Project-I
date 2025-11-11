// frontend/src/components/investor/details.js
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './css_files/details.css';
import Navbar from '../global/navbar';

function Details() {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    country: '',
    investmentRange: 0,
    investmentCurrency: '',
    industry: '',
    valueOffered: '',
    fundingAmount: '',
    fundingCurrency: ''
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

  const currencies = [
    { code: "KES", name: "Kenyan Shilling (KES)" },
    { code: "NGN", name: "Nigerian Naira (NGN)" },
    { code: "ZAR", name: "South African Rand (ZAR)" },
    { code: "EGP", name: "Egyptian Pound (EGP)" },
    { code: "TZS", name: "Tanzanian Shilling (TZS)" },
    { code: "GHS", name: "Ghanaian Cedi (GHS)" },
    { code: "XOF", name: "West African CFA Franc (XOF)" },
    { code: "XAF", name: "Central African CFA Franc (XAF)" },
    { code: "USD", name: "US Dollar (USD)" }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem('investorEmail');
      const response = await fetch(`https://ics-project.viscerealplate.me/api/auth/investor/details/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}  />
              </div>

              <div className="form-field">
                <label>Job Title</label>
                <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
              </div>

              <div className="form-field">
                <label>Country</label>
                <select name="country" value={formData.country} onChange={handleChange} required>
                  <option value="" disabled></option>
                  <option value="Algeria">Algeria</option>
                  <option value="Angola">Angola</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="DR Congo">DR Congo</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Ivory Coast">Ivory Coast</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>

              <div className="form-field">
                <label>Industry</label>
                <input type="text" name="industry" value={formData.industry} onChange={handleChange} required />
              </div>

              <div className="form-field">
                <label>Value Offered</label>
                <select name="valueOffered" value={formData.valueOffered} onChange={handleChange} required>
                  <option value="" disabled></option>
                  <option value="Funding">Funding</option>
                  <option value="Advisory">Advisory</option>
                  <option value="Network">Network</option>
                  <option value="Mentorship">Mentorship</option>
                </select>
              </div>

              <div className="form-field">
                <label>Funding Amount Willing to Offer</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="number"
                    name="fundingAmount"
                    value={formData.fundingAmount}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <select
                    name="fundingCurrency"
                    value={formData.fundingCurrency}
                    onChange={handleChange}
                  >
                    {currencies.map((currency) => (
                      <option key={currency.code} value={currency.code}>
                        {currency.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="next-button">Next</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
