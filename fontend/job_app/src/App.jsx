import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Components
import Navbar_user from './components/Navbar_user';
import Login_Page from './pages/Login_Page';
import Register_Page from './pages/Register_Page';

function App() {
  return (
    <Router>
      <div>
        <Navbar_user />
      </div>
      <main className="flex-grow bg-gray-50">
          <Routes>
            <Route path="/profile" element={<Login_Page />} />
            <Route path="/register" element={<Register_Page />} />
          </Routes>
      </main>
    </Router>
  );
}

export default App;
