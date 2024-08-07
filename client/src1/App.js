import React, { Suspense, lazy } from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import client from './apolloClient';
import './App.css';

const Members = lazy(() => import('./components/Members'));
const Help = lazy(() => import('./components/Help'));

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header className="App-header">
            <nav>
              <p>MAKE ME A HUBSTER</p>
              <ul>
                <li>
                  <NavLink exact="true" to="/" activeClassName="active">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/help" activeClassName="active">Help</NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route exact path="/" element={<Members />} />
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
