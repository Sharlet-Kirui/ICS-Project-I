// frontend/src/components/investor/network.js
import React, { useEffect, useState } from 'react';
import './css_files/network.css';

function InvestorNetwork() {
  const [pendingConnections, setPendingConnections] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);
  const [sentConnections, setSentConnections] = useState([]);
  const [startups, setStartups] = useState([]);
  const [showPDF, setShowPDF] = useState({});
  const email = localStorage.getItem('email');

  useEffect(() => {
    fetch(`https://ics-project.viscerealplate.me/api/connections/${email}`)
      .then(res => res.json())
      .then(data => {
        setPendingConnections(data.pending);
        setAcceptedConnections(data.accepted);
        setSentConnections(data.sent || []);
      })
      .catch(err => console.error(err));

    fetch(`https://ics-project.viscerealplate.me/api/startups`)
      .then(res => res.json())
      .then(data => setStartups(data))
      .catch(err => console.error(err));
  }, [email]);

  const [expandedCards, setExpandedCards] = useState({});
  const toggleDetails = (email) => {
    setExpandedCards(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const togglePDF = (email) => {
    setShowPDF(prev => ({ ...prev, [email]: !prev[email] }));
  };
  const handleResponse = async (connectionId, action) => {
    try {
      const res = await fetch('https://ics-project.viscerealplate.me/api/connections/respond', {
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
    } catch (error) {
      console.error('Error responding to request:', error);
    }
  };

  const getStartupDetails = (email) => {
    return startups.find(s => s.email === email);
  };

  const renderCard = (conn, type) => {
    const isReceiver = conn.receiverEmail === email;
    const profileEmail = isReceiver ? conn.senderEmail : conn.receiverEmail;
    const startup = getStartupDetails(profileEmail);

    if (!startup) return null;

    return (
      <div key={conn._id} className="investor-card">
        <div className="card-layout">
          <img src={`https://ics-project.viscerealplate.me/${startup.profileImageUrl}`} alt={startup.companyName} />
          <div className="card-summary">
            <h3>{startup.companyName}</h3>
            <p><strong>Pitch:</strong> {startup.pitch}</p>
            <button onClick={() => toggleDetails(startup.email)}>
              {expandedCards[startup.email] ? 'Show Less' : 'See More'}
            </button>

            {expandedCards[startup.email] && (
              <div className="details-side">
                <p><strong>Industry:</strong> {startup.industry}</p>
                <p><strong>Business Model:</strong> {startup.businessModel}</p>
                <p><strong>Stage:</strong> {startup.stage}</p>
                <p><strong>Country:</strong> {startup.country}</p>
                <p><strong>Amount Seeking:</strong> {startup.amountCurrency} {startup.amountSeeking?.toLocaleString()}</p>
                {startup.pitchDeckUrl && (
                  <div>
                          <strong>Pitch Deck:</strong>
                          <button onClick={() => togglePDF(startup.email)}>
                            {showPDF[startup.email] ? 'Hide PDF' : 'View PDF'}
                          </button>
                          {showPDF[startup.email] && (
                            <div className="modal">
                              <div className="modal-content">
                                <span className="close" onClick={() => togglePDF(startup.email)}>&times;</span>
                                <iframe
                                  src={`https://ics-project.viscerealplate.me/${startup.pitchDeckUrl}`}
                                  width="100%"
                                  height="600px"
                                  title="Pitch Deck"
                                ></iframe>
                              </div>
                            </div>
                          )}
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
            {type === 'accepted' && (
              <div>
                <button onClick={() => toggleDetails(startup.email)}>
                  {expandedCards[startup.email] ? 'Hide Contacts' : 'View Contacts'}
                </button>

                {expandedCards[startup.email] && (
                  <div className="contact-info">
                    <h4>Contact Information</h4>
                    <p><strong>Email:</strong> {startup.email}</p>
                    <p><strong>Phone:</strong> {startup.phone || 'N/A'}</p>
                    <p><strong>LinkedIn:</strong> {startup.linkedin} </p>
                    <p><strong>Website:</strong> {startup.website} </p>
                  </div>
                )}
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
          {sentConnections.length ? sentConnections.map(c => renderCard(c, 'sent')) : <p>No sent invitations yet</p>}

          <h2>Accepted Connections</h2>
          {acceptedConnections.length ? acceptedConnections.map(c => renderCard(c, 'accepted')) : <p>No accepted connections yet</p>}
        </div>
      </main>
    </div>
  );
}

export default InvestorNetwork;
