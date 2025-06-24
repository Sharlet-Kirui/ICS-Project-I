export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/global/navbar';
import SignUp from './components/global/sign_up';
import Details from './components/startup/details';
import Documents from './components/startup/documents';
import Contacts from './components/startup/contacts';
import Dashboard from './components/investor/dashboard';
import InvestorSignup from './components/investor/sign_up';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<h1>Welcome to the Homepage</h1>} />
        <Route path="/details" element={<Details />} />
        <Route path="/documents" element={<Documents/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/investorsignup" element={<InvestorSignup/>} />
      </Routes>
    </Router>
  );
}

