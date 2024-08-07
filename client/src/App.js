import React, { useState } from 'react';
import { Suspense, lazy } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import client from './apollo/client';  // Updated import path
import './App.css';

const Members = lazy(() => import('./components/Members'));
const Help = lazy(() => import('./components/Help'));

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <nav>
              <p className="navbar-title">MAKE ME A HUBSTER</p>
              <ul className={menuOpen ? 'open' : ''}>
                <li>
                  <NavLink exact="true" to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/help" className={({ isActive }) => isActive ? 'active' : ''}>Help</NavLink>
                </li>
              </ul>
              <div className="menu-icon" onClick={toggleMenu}>
                ☰
              </div>
            </nav>
          </header>
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Members />} />
                <Route path="/help" element={<Help />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
