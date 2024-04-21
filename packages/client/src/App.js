// /* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import { LandingPageContainer } from './containers/LandingPage/LandingPage';
import { CheckinQuestions } from './containers/QuestionPage/CheckinQuestions';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPageContainer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questions" element={<CheckinQuestions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
