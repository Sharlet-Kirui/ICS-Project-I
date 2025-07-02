// frontend/src/components/investor/network.js
import React, { useEffect, useState } from 'react';
import './css_files/network.css';

function InvestorNetwork() {
  const [pendingConnections, setPendingConnections] = useState([]);
  const [acceptedConnections, setAcceptedConnections] = useState([]);
  const [sentConnections, setSentConnections] = useState([]);
  const [startups, setStartups] = useState([]);
  const email = localStorage.getItem('email');

  useEffect(() => {
    fetch(`http://localhost:5000/api/connections/${email}`)
      .then(res => res.json())
      .then(data => {
        setPendingConnections(data.pending);
        setAcceptedConnections(data.accepted);
        setSentConnections(data.sent || []);
      })
      .catch(err => console.error(err));

    fetch(`http://localhost:5000/api/startups`)
      .then(res => res.json())
      .then(data => setStartups(data))
      .catch(err => console.error(err));
  }, [email]);

  const handleResponse = async (connectionId, action) => {
    try {
      const res = await fetch('http://localhost:5000/api/connections/respond', {
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

  const getStartupName = (email) => {
    const startup = startups.find(s => s.email === email);
    return startup ? startup.companyName : email;
  };

  const renderCard = (conn, type) => {
    const isReceiver = conn.receiverEmail === email;
    const profileEmail = isReceiver ? conn.senderEmail : conn.receiverEmail;
    const companyName = getStartupName(profileEmail);

    return (
      <div key={conn._id} className="investor-card">
        <div className="card-layout">
          <div className="card-summary">
            <h3>{companyName}</h3>
            <p>Status: {conn.status}</p>
            {type === 'pending' && isReceiver && (
              <div>
                <button onClick={() => handleResponse(conn._id, 'accepted')}>Accept</button>
                <button onClick={() => handleResponse(conn._id, 'rejected')}>Reject</button>
              </div>
            )}
            {type === 'accepted' && (
              <div>
                <button onClick={() => alert('Contact info from startup profile can be rendered here')}>View Contacts</button>
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

        <div className="investor-cards">
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
