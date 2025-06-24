import React, { useState } from "react";
import "./css_files/sign_up.css";

function InvestorSignup() {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <nav className="signup-nav">
          <div className="logo">Logo</div>
          <div className="nav-links">
            <a href="#">Home</a>
            <a href="#" className="active">Join</a>
            <a href="#">Back</a>
          </div>
        </nav>

        <form onSubmit={handleSubmit} className="signup-form">
          <h2 className="section-title">Investor Identity Info</h2>
          <div className="form-grid">
            <input name="fullName" onChange={handleChange} placeholder="Full Name" />
            <input name="linkedin" onChange={handleChange} placeholder="LinkedIn (personal)" />
            <input name="jobTitle" onChange={handleChange} placeholder="Job Title" />
            <input name="country" onChange={handleChange} placeholder="Country" />
            <input name="companyName" onChange={handleChange} placeholder="Company Name" />
            <input name="investorType" onChange={handleChange} placeholder="Investor Type" />
          </div>

          <h2 className="section-title">Investment Preferences</h2>
          <div className="form-grid">
            <div>
              <label>Investment Range</label>
              <div className="range-grid">
                <input name="minInvestment" placeholder="Min" onChange={handleChange} />
                <input name="maxInvestment" placeholder="Max" onChange={handleChange} />
              </div>
            </div>
            <div>
              <label>Industries</label>
              <input name="industries" onChange={handleChange} placeholder="Select" />
            </div>
          </div>

          <h2 className="section-title">Startup Stages</h2>
          <div className="checkbox-grid">
            {['Ideation', 'Early Growth Stage', 'Maturity', 'Validation', 'Scaling Stage'].map(stage => (
              <label key={stage}><input type="checkbox" name={stage} onChange={handleChange} /> {stage}</label>
            ))}
          </div>

          <h2 className="section-title">Value Offered</h2>
          <div className="checkbox-grid">
            {['Funding', 'Advisory', 'Network', 'Mentorship'].map(value => (
              <label key={value}><input type="checkbox" name={value} onChange={handleChange} /> {value}</label>
            ))}
          </div>

          <h2 className="section-title">Region</h2>
          <div className="form-grid">
            <input name="region" onChange={handleChange} placeholder="Select" />
            <input name="countryRegion" onChange={handleChange} placeholder="Country" />
          </div>

          <h2 className="section-title">Legal & Credibility Documents</h2>
          <div className="form-grid">
            <div>
              <label>Company Registration</label>
              <input type="file" name="companyRegistration" accept="application/pdf" onChange={handleFileChange} />
            </div>
            <div>
              <label>Audit and Financial Statements</label>
              <input type="file" name="auditFile" accept="application/pdf" onChange={handleFileChange} />
            </div>
          </div>

          <div className="submit-section">
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InvestorSignup;
