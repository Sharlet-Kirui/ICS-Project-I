// frontend/src/components/startup/details.js

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './css_files/details.css';
import Navbar from '../global/navbar';

function Details() {
  const [formData, setFormData] = useState({
    pitch: '',
    industry: '',
    businessModel: '',
    stage: '',
    country: '',
    city: '',
    foundingYear: '',
    teamSize: '',
    description: '',
    revenue: '',
    revenueCurrency: '',
    users: '',
    amountSeeking: '',
    amountCurrency: ''
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

  const handleNext = (e) => {
    e.preventDefault();
    console.log('Proceeding with:', formData);
    navigate('/documents');
  };

  return (
    <>
      <Navbar context="details" />
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
                  <h2 className="form-title">Details</h2>

                    <div className="form-field">
                      <label>One-line Pitch</label>
                      <input type="text" name="pitch" value={formData.pitch} onChange={handleChange} required />
                    </div>

                    <div className="form-field">
                      <label>Industry</label>
                      <input type="text" name="industry" value={formData.industry} onChange={handleChange} required />
                    </div>

                    <div className="form-field">
                      <label>Business Model</label>
                      <select name="businessModel" value={formData.businessModel} onChange={handleChange} required>
                        <option value="" disabled></option>
                        <option value="B2B">B2B</option>
                        <option value="B2C">B2C</option>
                        <option value="P2P">P2P</option>
                        <option value="D2C">D2C</option>
                        <option value="C2C">C2C</option>
                        <option value="B2B2C">B2B2C</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Current Stage</label>
                      <select name="stage" value={formData.stage} onChange={handleChange} required>
                        <option value="" disabled></option>
                        <option value="Pre-Seed">Pre-Seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Early">Early</option>
                        <option value="Growth">Growth</option>
                        <option value="Expansion">Expansion</option>
                        <option value="Exit">Exit</option>
                      </select>
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
                      <label>Founding Year</label>
                      <input type="number" name="foundingYear" value={formData.foundingYear} onChange={handleChange} required />
                    </div>

                    <div className="form-field">
                      <label>Team Size</label>
                      <select name="teamSize" value={formData.teamSize} onChange={handleChange} required>
                        <option value="" disabled></option>
                        <option value="1-5">1–5</option>
                        <option value="6-10">6–10</option>
                        <option value="11-20">11–20</option>
                        <option value="21-50">21–50</option>
                        <option value="51-100">51–100</option>
                        <option value="100+">100+</option>
                      </select>
                    </div>

                    <div className="form-field">
                      <label>Company Description</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>

                    <div className="form-field">
                      <label>Monthly Revenue</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                          type="number"
                          name="revenue"
                          value={formData.revenue}
                          onChange={handleChange}
                          required
                          placeholder=""
                        />
                        <select
                          name="revenueCurrency"
                          value={formData.revenueCurrency}
                          onChange={handleChange}
                          required
                        >
                          {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                              {currency.code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Users/Customers</label>
                      <input type="number" name="users" value={formData.users} onChange={handleChange} required />
                    </div>

                    <div className="form-field">
                      <label>Amount Seeking</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                          type="number"
                          name="amountSeeking"
                          value={formData.amountSeeking}
                          onChange={handleChange}
                          required
                          placeholder=""
                        />
                        <select
                          name="amountCurrency"
                          value={formData.amountCurrency}
                          onChange={handleChange}
                          required
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
