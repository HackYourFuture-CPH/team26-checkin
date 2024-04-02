import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPageContainer from './containers/LandingPage/LandingPage.Container';
import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPageContainer />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
// import LandingPageContainer from './containers/LandingPage/LandingPage.Container';
// // import { LandingPage } from './containers/LandingPage/LandingPage.Container';
// // import { PageNotFound } from './containers/PageNotFound/PageNotFound.Container';

// function App() {
//   return (
//     <div className="app">
//       <LandingPageContainer/>
//       {/* <Router>
//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="*" element={<PageNotFound />} />
//         </Routes>
//       </Router> */}
//     </div>
//   );
// }

// export default App;
