import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Pictures/Logo_echobeats_black.png';

function WelcomeHeader() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/home">
          <img src={logo} alt="logo" className="logo" />
        </Link>
      </div>
      <nav className="navbar">
        <ul className="nav-list">
          <li>
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/signin" className="nav-link">
              Sign In
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">
              Log In
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default WelcomeHeader;