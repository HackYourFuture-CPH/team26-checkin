/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { LandingPageContainer } from './containers/LandingPage/LandingPage';
import { Dashboard } from './containers/LandingPage/Dashboard';
import { PageNotFound } from './containers/PageNotFound/PageNotFound';
import { CheckinQuestions } from './containers/LandingPage/CheckinQuestionsPage/CheckinQuestions';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageContainer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions" element={<CheckinQuestions />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
