// frontend/src/components/admin/investorVerification.js
import React, { useEffect, useState } from 'react';
import './css_files/dashboard.css';

function InvestorVerification() {
  const [investors, setInvestors] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});
  const [showPDF, setShowPDF] = useState({});
  const [rejectionComments, setRejectionComments] = useState({});

  useEffect(() => {
    fetch('https://ics-project.viscerealplate.me/api/verification/investors/pending')
      .then(res => res.json())
      .then(data => setInvestors(data))
      .catch(err => console.error('Failed to fetch investors:', err));
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
      const res = await fetch('https://ics-project.viscerealplate.me/api/verification/investors/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, decision, comment })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      alert(`Investor ${decision}`, 'success');
      setInvestors(prev => prev.filter(i => i.email !== email));
    } catch (error) {
      console.error(error);
      alert('Failed to update status', 'error');
    }
  };

  return (
    <div className="investorverificationdashboard">
      <h2>Pending Investor Applications</h2>
      {investors.map(investor => (
        <div key={investor.email} className="admin-card">
          <div className="card-layout">
            <img src={`https://ics-project.viscerealplate.me/${investor.profileImage}`} alt={investor.fullName} />
            <div className="card-summary">
              <h3>{investor.fullName}</h3>
              <p><strong>Email:</strong> {investor.email}</p>
              <p><strong>Job Title:</strong> {investor.jobTitle}</p>
              <button onClick={() => toggleDetails(investor.email)}>
                {expandedCards[investor.email] ? 'Hide Details' : 'View Details'}
              </button>
              {expandedCards[investor.email] && (
                <div className="details-side">
                  <p><strong>Company:</strong> {investor.companyName}</p>
                  <p><strong>Industry:</strong> {investor.industry}</p>
                  <p><strong>Country:</strong> {investor.country}</p>
                  <p><strong>Value Offered:</strong> {investor.valueOffered?.join(', ')}</p>
                  <p><strong>Funding:</strong> {investor.fundingCurrency} {investor.fundingAmount}</p>
                  <p><strong>Phone:</strong> {investor.countryCode}{investor.phone}</p>
                  <p><strong>Website:</strong> <a href={investor.website} target="_blank" rel="noreferrer">{investor.website}</a></p>
                  <p><strong>Address:</strong> {investor.address}</p>
                  <p><strong>LinkedIn:</strong> <a href={investor.linkedin} target="_blank" rel="noreferrer">{investor.linkedin}</a></p>

                  {['financials', 'incorporation'].map(docKey => (
                    investor[docKey] && (
                      <div key={docKey}>
                        <strong>{docKey.replace('Url', '').replace(/([A-Z])/g, ' $1')}:</strong>
                        <button onClick={() => togglePDF(`${investor.email}_${docKey}`)}>
                          {showPDF[`${investor.email}_${docKey}`] ? 'Hide' : 'View'}
                        </button>
                        {showPDF[`${investor.email}_${docKey}`] && (
                          <div className="modal">
                            <div className="modal-content">
                              <span className="close" onClick={() => togglePDF(`${investor.email}_${docKey}`)}>&times;</span>
                              <iframe
                                src={`https://ics-project.viscerealplate.me/${investor[docKey]}`}
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

                  <div className="verify-actions">
                    <textarea
                      placeholder="Optional rejection comment..."
                      value={rejectionComments[investor.email] || ''}
                      onChange={(e) => setRejectionComments(prev => ({ ...prev, [investor.email]: e.target.value }))}
                    />
                    <button onClick={() => handleVerify(investor.email, 'approved')} className="approve-btn">Approve</button>
                    <button onClick={() => handleVerify(investor.email, 'rejected')} className="reject-btn">Reject</button>
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

export default InvestorVerification;
