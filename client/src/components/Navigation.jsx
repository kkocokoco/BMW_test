// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/member_style.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-title">MAKE ME A HUBSTER</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </li>
        <li>
          <Link to="/help">
            <FontAwesomeIcon icon={faQuestionCircle} /> Help
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
