// frontend/src/components/startup/profile.js
import React, { useEffect, useState } from 'react';
import './css_files/profile.css';

function StartupProfile() {
  const [formData, setFormData] = useState({});
  const [profileImagePreview, setProfileImagePreview] = useState(null);

useEffect(() => {
  const email = localStorage.getItem('email');
  fetch(`http://localhost:5000/api/startups/profile/${email}`)
    .then(res => res.json())
    .then(data => {
      setFormData(data);
      if (data.profileImageUrl) {
        setProfileImagePreview(`http://localhost:5000/${data.profileImageUrl}`);
      }
    })
    .catch(err => console.error('Error fetching startup profile:', err));
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

    const res = await fetch(`http://localhost:5000/api/startups/profile/${email}`, {
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
          <h2 className="form-title">Edit Startup Profile</h2>
          {profileImagePreview ? (
            <img src={profileImagePreview} alt="Profile" width="100" height="100" style={{ borderRadius: '50%' }} />
            ) : (
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                No Image
            </div>
            )}
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-field">
              <label>Profile Image</label>
              <input type="file" name="profileImageUrl" onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Company Name</label>
              <input name="companyName" value={formData.companyName || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input name="email" value={formData.email || ''} disabled />
            </div>
            <div className="form-field">
              <label>Pitch</label>
              <input name="pitch" value={formData.pitch || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Industry</label>
              <input name="industry" value={formData.industry || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Business Model</label>
              <select name="businessModel" value={formData.businessModel || ''} onChange={handleChange}>
                <option value="">Select</option>
                <option value="B2B">B2B</option>
                <option value="B2C">B2C</option>
                <option value="P2P">P2P</option>
                <option value="D2C">D2C</option>
                <option value="C2C">C2C</option>
                <option value="B2B2C">B2B2C</option>
              </select>
            </div>
            <div className="form-field">
              <label>Stage</label>
              <select name="stage" value={formData.stage || ''} onChange={handleChange}>
                <option value="">Select</option>
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
              <input name="country" value={formData.country || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Founding Year</label>
              <input name="foundingYear" value={formData.foundingYear || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Team Size</label>
              <select name="teamSize" value={formData.teamSize || ''} onChange={handleChange}>
                <option value="">Select</option>
                <option value="1–5">1–5</option>
                <option value="6–10">6–10</option>
                <option value="11–50">11–50</option>
                <option value="51–100">51–100</option>
                <option value="100+">100+</option>
              </select>
            </div>
            <div className="form-field">
              <label>Description</label>
              <input name="description" value={formData.description || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Revenue</label>
              <input name="revenue" value={formData.revenue || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Currency</label>
              <input name="revenueCurrency" value={formData.revenueCurrency || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Users</label>
              <input name="users" value={formData.users || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Amount Seeking</label>
              <input name="amountSeeking" value={formData.amountSeeking || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label>Currency</label>
              <input name="amountCurrency" value={formData.amountCurrency || ''} onChange={handleChange} />
            </div>
            <div className="form-field">
                <label>Pitch Deck</label>
                <input type="file" name="pitchDeck" onChange={handleChange} />
                {formData.pitchDeckUrl && <p>Current: <a href={`http://localhost:5000/${formData.pitchDeckUrl}`} target="_blank" rel="noreferrer">View Pitch Deck</a></p>}
                </div>

                <div className="form-field">
                <label>Registration Certificate</label>
                <input type="file" name="registrationCertificate" onChange={handleChange} />
                {formData.registrationCertificateUrl && <p>Current: <a href={`http://localhost:5000/${formData.registrationCertificateUrl}`} target="_blank" rel="noreferrer">View Certificate</a></p>}
                </div>

                <div className="form-field">
                <label>Financials</label>
                <input type="file" name="financials" onChange={handleChange} />
                {formData.financialsUrl && <p>Current: <a href={`http://localhost:5000/${formData.financialsUrl}`} target="_blank" rel="noreferrer">View Financials</a></p>}
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

export default StartupProfile;