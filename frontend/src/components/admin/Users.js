// frontend/src/components/admin/users.js
import React, { useEffect, useState } from 'react';
import './css_files/users.css';

const USER_TYPES = [
  { id: 'startup', label: 'Startups' },
  { id: 'investor', label: 'Investors' },
];

function UsersManagement() {
  const [startups, setStartups] = useState([]);
  const [investors, setInvestors] = useState([]);
  const [activeType, setActiveType] = useState('startup');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState({});
  const [showPDF, setShowPDF] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [startupsRes, investorsRes] = await Promise.all([
          fetch('https://ics-project.viscerealplate.me/api/startups').then(res => res.json()),
          fetch('https://ics-project.viscerealplate.me/api/investors').then(res => res.json())
        ]);
        setStartups(startupsRes);
        setInvestors(investorsRes);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  const allUsers = [
    ...startups.map(user => ({ ...user, userType: 'startup' })),
    ...investors.map(user => ({ ...user, userType: 'investor' }))
  ];

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch =
      user.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchesType = activeType ? user.userType === activeType : true;
    const matchesStatus = statusFilter !== 'all' ? user.status === statusFilter : true;
    return matchesSearch && matchesType && matchesStatus;
  });

  const toggleDetails = (email) => {
    setExpandedCards(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const togglePDF = (email) => {
    setShowPDF(prev => ({ ...prev, [email]: !prev[email] }));
  };

    const normalizeFilePath = (filePath) => {
    if (!filePath) return '';
    const fixedPath = filePath.replace(/\\/g, '/');
    return `https://ics-project.viscerealplate.me/${fixedPath}`;
    };

  return (
    <div className="users">
      <div className="filters-header">
        <div className="type-buttons">
          {USER_TYPES.map((type) => (
            <button
              key={type.id}
              className={`type-btn ${activeType === type.id ? 'active' : ''}`}
              onClick={() => setActiveType(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="status-select"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="card-list">
        {filteredUsers.map(user => (
          <div key={user.email} className="user-card">
            <div className="card-header">
              <img src={normalizeFilePath(user.profileImage || user.profileImageUrl)} alt={user.companyName} />
              <div className="summary">
                <h3>{user.companyName}</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Type:</strong> {user.userType}</p>
                <p><strong>Status:</strong> {user.status}</p>
                <button onClick={() => toggleDetails(user.email)}>
                  {expandedCards[user.email] ? 'Show Less' : 'See More'}
                </button>
              </div>
            </div>

            {expandedCards[user.email] && (
              <div className="details-side">
                {user.userType === 'startup' && (
                  <>
                    <p><strong>Industry:</strong> {user.industry}</p>
                    <p><strong>Business Model:</strong> {user.businessModel}</p>
                    <p><strong>Stage:</strong> {user.stage}</p>
                    <p><strong>Country:</strong> {user.country}</p>
                    <p><strong>Amount Seeking:</strong> {user.amountCurrency} {user.amountSeeking?.toLocaleString()}</p>
                    <p><strong>Phone:</strong> +{user.countryCode} {user.phone}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                    <p><strong>LinkedIn:</strong> {user.linkedin}</p>
                    <p><strong>Address:</strong> {user.address}</p>

                    {[user.pitchDeckUrl, user.financialsUrl, user.registrationCertificateUrl].map((url, i) => url && (
                      <div key={i}>
                        <strong>{['Pitch Deck', 'Financials', 'Certificate'][i]}:</strong>
                        <button onClick={() => togglePDF(`${user.email}-${i}`)}>
                          {showPDF[`${user.email}-${i}`] ? 'Hide PDF' : 'View PDF'}
                        </button>
                        {showPDF[`${user.email}-${i}`] && (
                          <div className="modal">
                            <div className="modal-content">
                              <span className="close" onClick={() => togglePDF(`${user.email}-${i}`)}>&times;</span>
                              <iframe
                                src={`https://ics-project.viscerealplate.me/${url}`}
                                width="100%"
                                height="600px"
                                title="Document"
                              ></iframe>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
                {user.userType === 'investor' && (
                  <>
                    <p><strong>Full Name:</strong> {user.fullName}</p>
                    <p><strong>Job Title:</strong> {user.jobTitle}</p>
                    <p><strong>Industry:</strong> {user.industry}</p>
                    <p><strong>Country:</strong> {user.country}</p>
                    <p><strong>Funding Amount:</strong> {user.fundingCurrency} {user.fundingAmount?.toLocaleString()}</p>
                    <p><strong>Phone:</strong> +{user.countryCode} {user.phone}</p>
                    <p><strong>Website:</strong> {user.website}</p>
                    <p><strong>LinkedIn:</strong> {user.linkedin}</p>
                    <p><strong>Address:</strong> {user.address}</p>

                    {[user.financials, user.incorporation].map((url, i) => {
                    const normalizedUrl = normalizeFilePath(url); // 👈 normalize here
                    return url && (
                        <div key={i}>
                        <strong>{['Financials', 'Certificate'][i]}:</strong>
                        <button onClick={() => togglePDF(`${user.email}-inv-${i}`)}>
                            {showPDF[`${user.email}-inv-${i}`] ? 'Hide PDF' : 'View PDF'}
                        </button>
                        {showPDF[`${user.email}-inv-${i}`] && (
                            <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={() => togglePDF(`${user.email}-inv-${i}`)}>&times;</span>
                                <iframe
                                src={normalizedUrl}
                                width="100%"
                                height="600px"
                                title="Document"
                                ></iframe>
                            </div>
                            </div>
                        )}
                        </div>
                    );
                    })}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersManagement;