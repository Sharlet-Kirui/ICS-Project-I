import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/global/navbar';
import SignUp from './components/global/sign_up';
import Home from './components/global/home';
import Details from './components/startup/details';
import Documents from './components/startup/documents';
import Contacts from './components/startup/contacts';
//import Dashboard from './components/investor/dashboard';
import InvestorSignup from './components/investor/sign_up';
import InvestorDetails from './components/investor/details';
import InvestorDocuments from './components/investor/documents';
import InvestorContacts from './components/investor/contacts';
import Login from './components/global/login';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home/>} />
        <Route path="/details" element={<Details />} />
        <Route path="/documents" element={<Documents/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/investor/signup" element={<InvestorSignup/>} />
        <Route path="/investor/details" element={<InvestorDetails/>} />
        <Route path="/investor/documents" element={<InvestorDocuments/>} />
        <Route path="/investor/contacts" element={<InvestorContacts/>} />
        <Route path="/login" element={<Login/>} />
        {/*<Route path="/dashboard" element={<Dashboard/>} />*/}
      </Routes>
    </Router>
  );
}
export default App;
