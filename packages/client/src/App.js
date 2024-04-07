/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import { LandingPageContainer } from './containers/LandingPage/LandingPage';
import { Dashboard } from './containers/LandingPage/Dashboard';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';
=======
import { LandingPage } from './containers/LandingPage/Landing';
import { PageNotFound } from './containers/PageNotFound/PageNotFound';
import { Dashboard } from './containers/LandingPage/Dashboard';
>>>>>>> main

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<LandingPageContainer />} />
=======
          <Route path="/" element={<LandingPage />} />
>>>>>>> main
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
