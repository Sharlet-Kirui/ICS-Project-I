// frontend/src/components/startup/documents.js

import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './css_files/document.css';
import Navbar from '../global/navbar';

function Documents() {
  const [files, setFiles] = useState({
    incorporation: null,
    pitchDeck: null,
    financials: null,
    profileImage: null
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

  const handleFileChange = (e) => {
    const { name, files: uploadedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: uploadedFiles[0] }));
  };

  const handleNext = async (e) => {
  e.preventDefault();
  const email = localStorage.getItem('email');
  const formData = new FormData();
  for (let key in files) {
    formData.append(key, files[key]);
  }

  try {
    const response = await fetch(`https://ics-project.viscerealplate.me/api/auth/documents/${email}`, {
      method: 'PUT',
      body: formData
    });

    const data = await response.json();
    if (response.ok) {
      navigate('/contacts');
    } else {
      alert(data.message || 'Upload failed.');
    }
  } catch (error) {
    alert('Upload error');
  }
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
              <h2 className="form-title">Upload Documents</h2>

              <div className="form-field">
                <label>Certificate of Incorporation (PDF)</label>
                <input type="file" accept=".pdf" name="incorporation" onChange={handleFileChange} required />
              </div>

              <div className="form-field">
                <label>Pitch Deck (PDF)</label>
                <input type="file" accept=".pdf" name="pitchDeck" onChange={handleFileChange} required />
              </div>

              <div className="form-field">
                <label>Financial Statement (PDF)</label>
                <input type="file" accept=".pdf" name="financials" onChange={handleFileChange} required />
              </div>

              <div className="form-field">
                <label>Profile Image (PNG/JPG)</label>
                <input type="file" accept=".png,.jpg,.jpeg" name="profileImage" onChange={handleFileChange} required />
              </div>

              <button type="submit" className="next-button">Next</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Documents;
