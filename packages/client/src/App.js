import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
import { LandingPage } from './containers/LandingPage/Landing';
import { PageNotFound } from './containers/PageNotFound/PageNotFound';
import { Dashboard } from './containers/LandingPage/Dashboard';
=======

import LandingPageContainer from './containers/LandingPage/LandingPage.Container';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';
>>>>>>> main

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
=======
          <Route path="/" element={<LandingPageContainer />} />
>>>>>>> main
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
