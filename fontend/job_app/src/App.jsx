import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import Navbar_user from './components/Navbar_user';

function App() {
  return (
    <Router>
      <div>
        <Navbar_user />
      </div>
    </Router>
  );
}

export default App;
