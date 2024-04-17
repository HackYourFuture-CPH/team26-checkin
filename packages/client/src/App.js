import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard/Dashboard';
// TODO: put back comment after the login flow is down
// import { LandingPageContainer } from './containers/LandingPage/LandingPage';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';
import { CheckinQuestions } from './containers/LandingPage/CheckinQuestionsPage/CheckinQuestions';
import { TeamIdContextProvider } from './hooks/contextHook';

function App() {
  return (
    <div className="app">
      <TeamIdContextProvider>
        <Router>
          <Routes>
            {/* TODO: put back comment after the login flow is down */}
            {/* <Route path="/" element={<LandingPageContainer />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/questions" element={<CheckinQuestions />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </TeamIdContextProvider>
    </div>
  );
}

export default App;
