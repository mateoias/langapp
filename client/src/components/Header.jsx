// src/components/Header.jsx
//import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Faqs">Language Learning FAQs</Link></li>
          <li><Link to="/Beginning">Beginning</Link></li>
          <li><Link to="/login">Intermediate</Link></li>
          <li><Link to="/Advanced">Advanced</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

