// frontend/src/components/admin/startupVerification.js
import React, { useEffect, useState } from 'react';
import './css_files/dashboard.css';

function StartupVerification() {
  const [startups, setStartups] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const [showPDF, setShowPDF] = useState({});
  const [rejectionComments, setRejectionComments] = useState({});

  useEffect(() => {
    fetch('https://ics-project.viscerealplate.me/api/api/verification/startups/pending')
      .then(res => res.json())
      .then(data => setStartups(data))
      .catch(err => console.error('Failed to fetch startups:', err));
  }, []);

  const toggleDetails = (email) => {
    setExpandedCards(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const togglePDF = (email) => {
    setShowPDF(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const handleVerify = async (email, decision) => {
    const comment = rejectionComments[email] || '';
    try {
      const res = await fetch('https://ics-project.viscerealplate.me/api/api/verification/startups/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, decision, comment })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      alert(`Startup ${decision}`, 'success');
      setStartups(prev => prev.filter(s => s.email !== email));
    } catch (error) {
      console.error(error);
      alert('Failed to update status', 'error');
    }
  };

  return (
    <div className="startupverificationdashboard">
      <h2>Pending Startup Applications</h2>
      {startups.map(startup => (
        <div key={startup.email} className="admin-card">
          <div className="card-layout">
            <img src={`https://ics-project.viscerealplate.me/${startup.profileImageUrl}`} alt={startup.companyName} />
            <div className="card-summary">
              <h3>{startup.companyName}</h3>
              <p><strong>Email:</strong> {startup.email}</p>
              <p><strong>Pitch:</strong> {startup.pitch}</p>
              <button onClick={() => toggleDetails(startup.email)}>
                {expandedCards[startup.email] ? 'Hide Details' : 'View Details'}
              </button>
              {expandedCards[startup.email] && (
                <div className="details-side">
                  <p><strong>Industry:</strong> {startup.industry}</p>
                  <p><strong>Business Model:</strong> {startup.businessModel}</p>
                  <p><strong>Stage:</strong> {startup.stage}</p>
                  <p><strong>Country:</strong> {startup.country}</p>
                  <p><strong>Founded:</strong> {startup.foundingYear}</p>
                  <p><strong>Team Size:</strong> {startup.teamSize}</p>
                  <p><strong>Description:</strong> {startup.description}</p>
                  <p><strong>Revenue:</strong> {startup.revenueCurrency} {startup.revenue}</p>
                  <p><strong>Users:</strong> {startup.users}</p>
                  <p><strong>Amount Seeking:</strong> {startup.amountCurrency} {startup.amountSeeking}</p>
                  <p><strong>Phone:</strong> {startup.countryCode}{startup.phone}</p>
                  <p><strong>Website:</strong> <a href={startup.website} target="_blank" rel="noreferrer">{startup.website}</a></p>
                  <p><strong>Address:</strong> {startup.address}</p>
                  <p><strong>LinkedIn:</strong> <a href={startup.linkedin} target="_blank" rel="noreferrer">{startup.linkedin}</a></p>

                  {/* Documents */}
                  {['pitchDeckUrl', 'registrationCertificateUrl', 'financialsUrl'].map(docKey => (
                    startup[docKey] && (
                      <div key={docKey}>
                        <strong>{docKey.replace('Url', '').replace(/([A-Z])/g, ' $1')}:</strong>
                        <button onClick={() => togglePDF(`${startup.email}_${docKey}`)}>
                          {showPDF[`${startup.email}_${docKey}`] ? 'Hide' : 'View'}
                        </button>
                        {showPDF[`${startup.email}_${docKey}`] && (
                          <div className="modal">
                            <div className="modal-content">
                              <span className="close" onClick={() => togglePDF(`${startup.email}_${docKey}`)}>&times;</span>
                              <iframe
                                src={`https://ics-project.viscerealplate.me/${startup[docKey]}`}
                                width="100%"
                                height="600px"
                                title={docKey}
                              ></iframe>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  ))}

                  {/* Decision Buttons */}
                  <div className="verify-actions">
                    <textarea
                      placeholder="Optional rejection comment..."
                      value={rejectionComments[startup.email] || ''}
                      onChange={(e) => setRejectionComments(prev => ({ ...prev, [startup.email]: e.target.value }))}
                    />
                    <button onClick={() => handleVerify(startup.email, 'approved')} className="approve-btn">Approve</button>
                    <button onClick={() => handleVerify(startup.email, 'rejected')} className="reject-btn">Reject</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StartupVerification;
