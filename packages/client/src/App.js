// /* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
import { LandingPageContainer } from './containers/LandingPage/LandingPage';
import { CheckinQuestions } from './containers/QuestionPage/CheckinQuestions';
import { TeamIdContextProvider } from './hooks/contextHook';
import ReportPage from './containers/ReportPage/ReportPage';
import { PageNotFound } from './containers/PageNotFound/PageNotFound';

function App() {
  return (
    <div className="app">
      <TeamIdContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPageContainer />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/questions" element={<CheckinQuestions />} />
            <Route path="/reportpage" element={<ReportPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </TeamIdContextProvider>
    </div>
  );
}

export default App;
