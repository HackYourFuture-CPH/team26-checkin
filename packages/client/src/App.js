// /* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import { LandingPageContainer } from './containers/LandingPage/LandingPage';
import { CheckinQuestions } from './containers/QuestionPage/CheckinQuestions';
import { TeamIdContextProvider } from './hooks/contextHook';

function App() {
  return (
    <div className="app">
      <TeamIdContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPageContainer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/questions" element={<CheckinQuestions />} />
          </Routes>
        </Router>
      </TeamIdContextProvider>
    </div>
  );
}

export default App;
