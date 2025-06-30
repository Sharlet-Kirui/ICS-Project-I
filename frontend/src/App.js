
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/global/navbar';
import StartupSignUp from './components/global/StartupSignup';
import Home from './components/global/home';
import Details from './components/startup/details';
import Documents from './components/startup/documents';
import Contacts from './components/startup/contacts';
import InvestorSignup from './components/investor/sign_up';
import ContactForm from './components/investor/contactform';
import Dashboard from './components/investor/dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<StartupSignUp />} />
        <Route path="/details" element={<Details />} />
        <Route path="/documents" element={<Documents/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/sign_up" element={<InvestorSignup/>} />
        <Route path="/contactform" element={<ContactForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;
