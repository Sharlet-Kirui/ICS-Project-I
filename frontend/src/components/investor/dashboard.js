// frontend/src/components/investor/dashboard.js
import React, { useEffect, useState } from 'react';
import './css_files/dashboard.css';
import { useNotification } from '../../contexts/NotificationContext';

function InvestorDashboard() {
  const [startups, setStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedCards, setExpandedCards] = useState({});
  const [showPDF, setShowPDF] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [amountRange, setAmountRange] = useState([0, 0]);
  const [investorProfile, setInvestorProfile] = useState(null);
  // const [connectionStatus, setConnectionStatus] = useState({}); // Optional: track button disable

  const { addNotification } = useNotification();

  useEffect(() => {
    fetch('http://localhost:5000/api/startups')
      .then(res => res.json())
      .then(data => setStartups(data))
      .catch(err => console.error(err));

    fetch('http://localhost:5000/api/startups/filters')
      .then(res => res.json())
      .then(data => {
        setFilterOptions(data);
        setAmountRange(data.amountRange);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
  const email = localStorage.getItem('email');
  if (email) {
    fetch(`http://localhost:5000/api/investors/profile/${email}`)
      .then(res => res.json())
      .then(data => setInvestorProfile(data))
      .catch(err => console.error('Error fetching investor profile:', err));
  }
}, []);

  const handleFilterChange = (key, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value
    }));
  };

  const removeFilter = (key) => {
    setSelectedFilters(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const toggleDetails = (email) => {
    setExpandedCards(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const togglePDF = (email) => {
    setShowPDF(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const handleShowInterest = async (startup) => {
    const senderEmail = localStorage.getItem('email');
    const senderType = 'investor';
    const senderName = investorProfile?.companyName || senderEmail;
    const receiverEmail = startup.email;
    const receiverType = 'startup';
    const recipientName = startup.companyName;

    try {
      const connectionRes = await fetch('http://localhost:5000/api/connections/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senderEmail, senderType, receiverEmail, receiverType }),
      });

      const connectionResult = await connectionRes.json();

      if (!connectionRes.ok) {
        addNotification(connectionResult.message || 'Failed to create connection', 'error');
        return;
      }

      const notifRes = await fetch('http://localhost:5000/api/notifications/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderEmail,
          recipientEmail: receiverEmail,
          message: `${senderName} has shown interest in your startup.`,
          type: 'interest',
        }),
      });

      const emailRes = await fetch('http://localhost:5000/api/email/send-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderEmail,
          receiverEmail,
          senderName,
          recipientName,
        }),
      });

      const notifSuccess = notifRes.ok;
      const emailSuccess = emailRes.ok;

      if (notifSuccess && emailSuccess) {
        addNotification(`Interest shown to ${recipientName}, email & notification sent!`, 'success');
        // setConnectionStatus(prev => ({ ...prev, [receiverEmail]: true }));
      } else if (notifSuccess) {
        addNotification(`Notification sent but email failed`, 'warning');
      } else if (emailSuccess) {
        addNotification(`Email sent but notification failed`, 'warning');
      } else {
        addNotification(`Connection created, but both email and notification failed`, 'error');
      }

    } catch (error) {
      console.error(error);
      addNotification('Server error occurred', 'error');
    }
  };

  const filteredStartups = startups.filter(startup => {
    return (
      (!searchTerm || startup.companyName?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedFilters.industry || startup.industry === selectedFilters.industry) &&
      (!selectedFilters.businessModel || startup.businessModel === selectedFilters.businessModel) &&
      (!selectedFilters.stage || startup.stage === selectedFilters.stage) &&
      (!selectedFilters.country || startup.country === selectedFilters.country) &&
      (!selectedFilters.amountRange || (
        startup.amountSeeking >= selectedFilters.amountRange[0] &&
        startup.amountSeeking <= selectedFilters.amountRange[1]
      ))
    );
  });

  return (
    <div className="dashboard">
      <aside className="filter-sidebar">
        <h4>Filters</h4>

        <div className="filter-group">
          <h5>Industry</h5>
          {filterOptions.industries?.map(ind => (
            <label key={ind}>
              <input
                type="radio"
                name="industry"
                checked={selectedFilters.industry === ind}
                onChange={() => handleFilterChange('industry', ind)}
              /> {ind}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h5>Business Model</h5>
          {filterOptions.businessModels?.map(model => (
            <label key={model}>
              <input
                type="radio"
                name="businessModel"
                checked={selectedFilters.businessModel === model}
                onChange={() => handleFilterChange('businessModel', model)}
              /> {model}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h5>Startup Stage</h5>
          {filterOptions.stages?.map(stage => (
            <label key={stage}>
              <input
                type="radio"
                name="stage"
                checked={selectedFilters.stage === stage}
                onChange={() => handleFilterChange('stage', stage)}
              /> {stage}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h5>Country</h5>
          {filterOptions.countries?.map(c => (
            <label key={c}>
              <input
                type="radio"
                name="country"
                checked={selectedFilters.country === c}
                onChange={() => handleFilterChange('country', c)}
              /> {c}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <h5>Amount Seeking</h5>
          <input
            type="range"
            min={amountRange[0] || 0}
            max={amountRange[1] || 0}
            step="1000"
            value={selectedFilters.amountRange?.[1] || amountRange[1]}
            onChange={e => handleFilterChange('amountRange', [0, parseInt(e.target.value)])}
          />
          <div>Up to: {selectedFilters.amountRange?.[1] || amountRange[1]}</div>
        </div>

        <div className="selected-filters">
          <h5>Selected Filters</h5>
          {Object.entries(selectedFilters).map(([key, value]) => (
            <span key={key} className="filter-tag" onClick={() => removeFilter(key)}>
              {key}: {typeof value === 'object' ? value[1] : value} ×
            </span>
          ))}
        </div>
      </aside>

      <main className="content">
        <div className="search-filter">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="investor-cards">
          {filteredStartups.map(startup => (
            <div key={startup.email} className="investor-card">
              <div className="card-layout">
                <img src={`http://localhost:5000/${startup.profileImageUrl}`} alt={startup.companyName} />
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
                                  src={`http://localhost:5000/${startup.pitchDeckUrl}`}
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
                  <button
                    className="interest-btn"
                    onClick={() => handleShowInterest(startup)}
                    // disabled={connectionStatus[startup.email]} // Optional: prevent re-click
                  >
                    Show Interest
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default InvestorDashboard;