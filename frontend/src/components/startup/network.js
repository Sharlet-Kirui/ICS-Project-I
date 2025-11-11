// frontend/src/components/startup/network.js
import React, { useEffect, useState } from 'react';
import './css_files/network.css';

function StartupNetwork() {
  const email = localStorage.getItem('email');
  const [pendingConnections, setPendingConnections] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);
  const [sentConnections, setSentConnections] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    fetch(`https://ics-project.viscerealplate.me/api/api/connections/${email}`)
      .then(res => res.json())
      .then(data => {
        setPendingConnections(data.pending || []);
        setAcceptedConnections(data.accepted || []);
        setSentConnections(data.sent || []);
      })
      .catch(err => console.error(err));

    fetch(`https://ics-project.viscerealplate.me/api/api/investors`)
      .then(res => res.json())
      .then(data => setInvestors(data))
      .catch(err => console.error(err));
  }, [email]);

  const toggleDetails = (email) => {
    setExpandedCards(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const handleResponse = async (connectionId, action) => {
    try {
      const res = await fetch('https://ics-project.viscerealplate.me/api/api/connections/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionId, action }),
      });

      if (res.ok) {
        setPendingConnections(prev => prev.filter(c => c._id !== connectionId));
        if (action === 'accepted') {
          const updated = await res.json();
          setAcceptedConnections(prev => [...prev, updated]);
        }
      }
    } catch (err) {
      console.error('Connection response error:', err);
    }
  };

  const getInvestor = (email) => investors.find(inv => inv.email === email);

  const renderCard = (conn, type) => {
    const isReceiver = conn.receiverEmail === email;
    const profileEmail = isReceiver ? conn.senderEmail : conn.receiverEmail;
    const investor = getInvestor(profileEmail);
    if (!investor) return null;

    return (
      <div key={conn._id} className="investor-card">
        <div className="card-layout">
          <img src={`https://ics-project.viscerealplate.me/${investor.profileImage}`} alt={investor.fullName} />
          <div className="card-summary">
            <h3>{investor.fullName}</h3>
            <p>{investor.jobTitle}</p>
            <p className="company-name">{investor.companyName}</p>
            <button onClick={() => toggleDetails(investor.email)}>
              {expandedCards[investor.email] ? 'Show Less' : 'See More'}
            </button>

            {expandedCards[investor.email] && (
              <div className="details-side">
                <p><strong>Industry:</strong> {investor.industry}</p>
                <p><strong>Value Offered:</strong> {investor.valueOffered?.join(', ')}</p>
                <p><strong>Country:</strong> {investor.country}</p>
                <p><strong>Funding:</strong> {investor.fundingCurrency} {investor.fundingAmount?.toLocaleString()}</p>
              </div>
                )}
              {type === 'accepted' && (
                  <div>
                <button onClick={() => toggleDetails(investor.email)}>
                  {expandedCards[investor.email] ? 'Hide Contacts' : 'View Contacts'}
                </button>

                {expandedCards[investor.email] && (
                  <div className="contact-info">
                    <h4>Contact Information</h4>
                    <p><strong>Email:</strong> {investor.email}</p>
                    <p><strong>Phone:</strong> {investor.phone || 'N/A'}</p>
                    <p><strong>LinkedIn:</strong> {investor.linkedin} </p>
                    <p><strong>Website:</strong> {investor.website} </p>
                  </div>
                )}
              </div>
            )}

            <p><strong>Status:</strong> {conn.status}</p>

            {type === 'pending' && isReceiver && (
              <div>
                <button onClick={() => handleResponse(conn._id, 'accepted')}>Accept</button>
                <button onClick={() => handleResponse(conn._id, 'rejected')}>Reject</button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <main className="content">
        <div className="inv-network-overview">
          <div className="inv-overview-box">
            <h2 className="inv-overview-title">Pending Invitations</h2>
            <p className="inv-overview-count">{pendingConnections.length}</p>
          </div>

          <div className="inv-overview-box">
            <h2 className="inv-overview-title">Sent Invitations</h2>
            <p className="inv-overview-count">{sentConnections.length}</p>
          </div>

          <div className="inv-overview-box">
            <h2 className="inv-overview-title">Accepted Connections</h2>
            <p className="inv-overview-count">{acceptedConnections.length}</p>
          </div>
        </div>

        <div className="network-cards">
          <h2>Pending Invitations</h2>
          {pendingConnections.length ? pendingConnections.map(c => renderCard(c, 'pending')) : <p>No pending invitations</p>}

          <h2>Sent Invitations</h2>
          {sentConnections.length ? sentConnections.map(c => renderCard(c, 'sent')) : <p>No sent invitations</p>}

          <h2>Accepted Connections</h2>
          {acceptedConnections.length ? acceptedConnections.map(c => renderCard(c, 'accepted')) : <p>No accepted connections yet</p>}
        </div>
      </main>
    </div>
  );
}

export default StartupNetwork;
