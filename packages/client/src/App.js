/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
// TODO: put back comment after the login flow is down
// import { LandingPageContainer } from './containers/LandingPage/LandingPage';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';
// TODO: put back comment after the Dashboard backend flow is down
// import { Dashboard }from './containers/Dashboard/Dashboard';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
         {/* TODO: put back comment after the login flow is down */}
         {/* <Route path="/" element={<LandingPageContainer />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;