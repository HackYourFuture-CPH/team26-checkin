import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
// import { LandingPage } from './containers/LandingPage/LandingPage.Container';
// import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';

function App() {
  return (
    <div className="app">
      <Login />
      Hello
      {/* <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
