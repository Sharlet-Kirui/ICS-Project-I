// frontend/src/components/investor/dashboard.js
import React, { useEffect, useState } from 'react';
import './css_files/dashboard.css';

function InvestorDashboard() {
  const [startups, setStartups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expandedCards, setExpandedCards] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [amountRange, setAmountRange] = useState([0, 0]);

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

  const filteredStartups = startups.filter(startup => {
    return (
      (!searchTerm || startup.companyName?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedFilters.industry || startup.industry === selectedFilters.industry) &&
      (!selectedFilters.businessModel || startup.businessModel === selectedFilters.businessModel) &&
      (!selectedFilters.stage || startup.stage === selectedFilters.stage) &&
      (!selectedFilters.country || startup.country === selectedFilters.country) &&
      (!selectedFilters.amountRange || (startup.amountSeeking >= selectedFilters.amountRange[0] && startup.amountSeeking <= selectedFilters.amountRange[1]))
    );
  });

  const toggleDetails = (email) => {
    setExpandedCards(prev => ({ ...prev, [email]: !prev[email] }));
  };

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
            placeholder="Search Startups"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <button className={Object.keys(selectedFilters).length ? 'active' : ''}>Filter</button>
        </div>

        <div className="investor-cards">
          {filteredStartups.map(startup => (
            <div key={startup.email} className="investor-card">
              <div className="card-layout">
                <img src={`http://localhost:5000/${startup.profileImage}`} alt={startup.companyName} />
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
                    </div>
                  )}
                  <button className="interest-btn">Show Interest</button>
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
