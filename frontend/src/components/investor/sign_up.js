import React, { useState } from 'react';
import "./css_files/sign_up.css";

const InvestorSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    jobTitle: '',
    companyName: '',
    linkedin: '',
    country: '',
    investorType: '',
    investmentMin: '',
    investmentMax: '',
    industry: '',
    region: '',
    regionCountry: '',
    startupStages: [],
    valueOffered: [],
    companyDoc: null,
    auditDoc: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e, type) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const list = new Set(prev[type]);
      checked ? list.add(value) : list.delete(value);
      return { ...prev, [type]: Array.from(list) };
    });
  };

  const handleFileUpload = (e, field) => {
    setFormData(prev => ({ ...prev, [field]: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can now POST formData to your server
  };

  return (
    <div className="signup-container">
      <div className="tabs">
        <div className="tab active">Basic Info</div>
        <div className="tab active">Details</div>
        <div className="tab">Documents</div>
        <div className="tab">Contact Info</div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div>
            <label>Full Name</label>
            <input name="fullName" onChange={handleChange} />
          </div>
          <div>
            <label>LinkedIn (personal)</label>
            <input name="linkedin" onChange={handleChange} />
          </div>
          <div>
            <label>Job Title</label>
            <input name="jobTitle" onChange={handleChange} />
          </div>
          <div>
            <label>Country</label>
            <input name="country" onChange={handleChange} />
          </div>
          <div>
            <label>Company Name</label>
            <input name="companyName" onChange={handleChange} />
          </div>
          <div>
            <label>Investor Type</label>
            <input name="investorType" onChange={handleChange} />
          </div>
        </div>

        <div className="form-section">
          <div>
            <label>Investment range</label>
            <div className="range-inputs">
              <input type="number" name="investmentMin" placeholder="Min" onChange={handleChange} />
              <input type="number" name="investmentMax" placeholder="Max" onChange={handleChange} />
            </div>
          </div>
          <div>
            <label>Industries</label>
            <select name="industry" onChange={handleChange}>
              <option>Select</option>
              <option>Agri-Tech</option>
              <option>HealthTech</option>
              <option>ClimateTech</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <div className="checkbox-group">
            <label className="checkbox-title">Startup Stages</label>
            <div className="checkbox-inline">
              {['Ideation', 'Early Growth Stage', 'Validation', 'Scaling Stage', 'Maturity'].map(stage => (
                <label key={stage}>
                  <input
                    type="checkbox"
                    value={stage}
                    onChange={e => handleCheckbox(e, 'startupStages')}
                  /> {stage}
                </label>
              ))}
            </div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-title">Value Offered</label>
            <div className="checkbox-inline">
              {['Funding', 'Advisory', 'Network', 'Mentorship'].map(val => (
                <label key={val}>
                  <input
                    type="checkbox"
                    value={val}
                    onChange={e => handleCheckbox(e, 'valueOffered')}
                  /> {val}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <div>
            <label>Region</label>
            <select name="region" onChange={handleChange}>
              <option>Select</option>
              <option>Sub-Saharan Africa</option>
              <option>North Africa</option>
              <option>East Africa</option>
            </select>
          </div>
          <div>
            <label>Country</label>
            <input name="regionCountry" onChange={handleChange} />
          </div>
        </div>

        <div className="upload-section">
          <div className="upload-box">
            <p>Company Registration</p>
            <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'companyDoc')} />
            <p>📤 upload PDF</p>
          </div>
          <div className="upload-box">
            <p>Audit and Financial Statements</p>
            <input type="file" accept=".pdf" onChange={(e) => handleFileUpload(e, 'auditDoc')} />
            <p>📤 upload PDF</p>
          </div>
        </div>

        <button className="next-btn" type="submit">Next</button>
      </form>
    </div>
  );
};

export default InvestorSignup;
