import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import your pages
import Signup from './pages/Signup';
import Login from './pages/Login';
import Feed from './pages/Feed';

function App() {
  return (
    <Router>
      {/* This adds the pop-up notifications */}
      <Toaster position="top-center" reverseOrder={false} />
      
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;