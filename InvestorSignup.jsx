import React, { useState } from "react";

const InvestorSignup = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#c1d7d7] px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <nav className="flex justify-between mb-6">
          <div className="text-2xl font-bold">Logo</div>
          <div className="space-x-4">
            <a href="#" className="text-gray-700 hover:underline">Home</a>
            <a href="#" className="font-bold underline">Join</a>
            <a href="#" className="text-gray-700 hover:underline">Back</a>
          </div>
        </nav>

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Investor Identity Info</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="fullName" onChange={handleChange} placeholder="Full Name" className="border p-2 rounded" />
            <input name="linkedin" onChange={handleChange} placeholder="LinkedIn (personal)" className="border p-2 rounded" />
            <input name="jobTitle" onChange={handleChange} placeholder="Job Title" className="border p-2 rounded" />
            <input name="country" onChange={handleChange} placeholder="Country" className="border p-2 rounded" />
            <input name="companyName" onChange={handleChange} placeholder="Company Name" className="border p-2 rounded" />
            <input name="investorType" onChange={handleChange} placeholder="Investor Type" className="border p-2 rounded" />
          </div>

          <h2 className="text-xl font-bold">Investment Preferences</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Investment Range</label>
              <div className="flex gap-2">
                <input name="minInvestment" placeholder="Min" onChange={handleChange} className="border p-2 rounded w-full" />
                <input name="maxInvestment" placeholder="Max" onChange={handleChange} className="border p-2 rounded w-full" />
              </div>
            </div>
            <div>
              <label className="block mb-1">Industries</label>
              <input name="industries" onChange={handleChange} placeholder="Select" className="border p-2 rounded w-full" />
            </div>
          </div>

          <h2 className="text-xl font-bold">Startup Stages</h2>
          <div className="grid grid-cols-3 gap-2">
            {['Ideation', 'Early Growth Stage', 'Maturity', 'Validation', 'Scaling Stage'].map(stage => (
              <label key={stage}><input type="checkbox" name={stage} onChange={handleChange} className="mr-2" />{stage}</label>
            ))}
          </div>

          <h2 className="text-xl font-bold">Value Offered</h2>
          <div className="grid grid-cols-2 gap-2">
            {['Funding', 'Advisory', 'Network', 'Mentorship'].map(value => (
              <label key={value}><input type="checkbox" name={value} onChange={handleChange} className="mr-2" />{value}</label>
            ))}
          </div>

          <h2 className="text-xl font-bold">Region</h2>
          <div className="grid grid-cols-2 gap-4">
            <input name="region" onChange={handleChange} placeholder="Select" className="border p-2 rounded" />
            <input name="countryRegion" onChange={handleChange} placeholder="Country" className="border p-2 rounded" />
          </div>

          <h2 className="text-xl font-bold">Legal & Credibility Documents</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block">Company Registration</label>
              <input type="file" name="companyRegistration" accept="application/pdf" onChange={handleFileChange} className="border p-2 rounded w-full" />
            </div>
            <div>
              <label className="block">Audit and Financial Statements</label>
              <input type="file" name="auditFile" accept="application/pdf" onChange={handleFileChange} className="border p-2 rounded w-full" />
            </div>
          </div>

          <div className="text-right">
            <button type="submit" className="bg-gray-800 text-white px-6 py-2 rounded">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvestorSignup;
