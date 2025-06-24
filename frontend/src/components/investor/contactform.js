import React, { useState } from 'react';
import "./css_files/contactform.css";

const ContactForm = () => {
  const [form, setForm] = useState({
    website: '',
    linkedin: '',
    email: '',
    contact: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        alert('Contact info submitted successfully!');
      } else {
        alert('Error submitting contact info.');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#c5ddde',
      margin: '2rem auto',
      padding: '2rem',
      width: '80%',
      borderRadius: '15px'
    }}>
      <Tabs />
      <form onSubmit={handleSubmit}>
        {[
          { label: 'Website', name: 'website' },
          { label: 'Linkedin (company)', name: 'linkedin' },
          { label: 'Email address', name: 'email' },
          { label: 'Contact', name: 'contact' }
        ].map(({ label, name }) => (
          <div key={name} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>{label}</label>
            <input
              name={name}
              type="text"
              value={form[name]}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
              required
            />
          </div>
        ))}
        <button type="submit" style={{
          backgroundColor: '#6b777a',
          color: '#000',
          padding: '0.5rem 1rem',
          fontWeight: 'bold',
          float: 'right'
        }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
