// frontend/src/components/investor/profile.js
import React, { useEffect, useState } from 'react';
import './css_files/profile.css';

function InvestorProfile() {
  const [formData, setFormData] = useState({});
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    fetch(`http://localhost:5000/api/auth/investor/profile/${email}`)
      .then(res => res.json())
      .then(data => {
        setFormData(data);
        setProfileImagePreview(data.profileImage);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      setProfileImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('email');
    const form = new FormData();
    for (const key in formData) form.append(key, formData[key]);

    const res = await fetch(`http://localhost:5000/api/auth/investor/profile/${email}`, {
      method: 'PUT',
      body: form
    });

    if (res.ok) alert('Profile updated successfully!');
    else alert('Failed to update profile.');
  };

  return (
    <div className="signup-page">
      <div className="form-container">
        <div className="form-content">
          <h2 className="form-title">Edit Investor Profile</h2>
          {profileImagePreview && (
            <img
                src={`http://localhost:5000/${profileImagePreview}`}
                alt="Profile"
                width="100"
                height="100"
                style={{ borderRadius: '50%' }}
            />
            )}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-field">
              <label>Profile Image</label>
              <input type="file" name="profileImage" onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Company Name</label>
              <input name="companyName" value={formData.companyName || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Full Name</label>
              <input name="fullName" value={formData.fullName || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input name="email" value={formData.email || ''} disabled />
            </div>
            <div className="form-field">
              <label>Job Title</label>
              <input name="jobTitle" value={formData.jobTitle || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Country</label>
              <input name="country" value={formData.country || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Industry</label>
              <input name="industry" value={formData.industry || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Value Offered</label>
              <input name="valueOffered" value={(formData.valueOffered || []).join(', ')} onChange={(e) => setFormData(prev => ({ ...prev, valueOffered: e.target.value.split(',').map(val => val.trim()) }))} />
            </div>
            <div className="form-field">
              <label>Funding Amount</label>
              <input name="fundingAmount" value={formData.fundingAmount || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Funding Currency</label>
              <input name="fundingCurrency" value={formData.fundingCurrency || ''} onChange={handleChange} />
            </div>

            <div className="form-field">
            <label>Incorporation Document</label>
            <input type="file" name="incorporation" onChange={handleChange} />
            {formData.incorporation && <p>Current: <a href={`http://localhost:5000/${formData.incorporation}`} target="_blank" rel="noreferrer">View Incorporation</a></p>}
            </div>

            <div className="form-field">
            <label>Financials</label>
            <input type="file" name="financials" onChange={handleChange} />
            {formData.financials && <p>Current: <a href={`http://localhost:5000/${formData.financials}`} target="_blank" rel="noreferrer">View Financials</a></p>}
            </div>

            <div className="form-field">
              <label>Phone</label>
              <input name="phone" value={formData.phone || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Country Code</label>
              <input name="countryCode" value={formData.countryCode || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Website</label>
              <input name="website" value={formData.website || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Address</label>
              <input name="address" value={formData.address || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>LinkedIn</label>
              <input name="linkedin" value={formData.linkedin || ''} onChange={handleChange} />
            </div>

            <button className="next-button" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InvestorProfile;