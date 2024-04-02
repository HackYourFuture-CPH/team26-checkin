// import React, { useEffect, useState } from 'react';
// import { apiURL } from '../../apiURL';
// import './LandingPage.Style.css';

// export const LandingPage = () => {
//   const [exampleResources, setExampleResources] = useState([]);
//   useEffect(() => {
//     async function fetchExampleResources() {
//       const response = await fetch(`${apiURL()}/exampleResources`);
//       const examples = await response.json();
//       setExampleResources(examples);
//     }

//     fetchExampleResources();
//   }, []);

//   return (
//     <div className="landing-page-container">
//       <span>Landing Page</span>
//       {exampleResources.map((example) => (
//         <div key={example.id}>{example.title}</div>
//       ))}
//     </div>
//   );
// };

import React from 'react';
import Testimonials from '../../components/Login/Testimonials';
import logo from './logo.svg';
import { Typography, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
import './LandingPage.Style.css';
// Import necessary components from Material-UI

const CustomButton = styled(Button)({
  padding: '14px 20px',
  backgroundColor: 'var(--primary-color)',
  color: 'white',
});

const LandingPageContainer = () => {
  return (
    <div className="login-page">
      <div className="testimonial-container">
        <Typography className="text-field" variant="h4" color="white">
          Don’t forget to invite teammates!
        </Typography>
        <div className="testimonial-section">
          <div className="testimonial-cards">
            <Testimonials /> {/* Render the Testimonials component */}
          </div>
        </div>
      </div>

      <div className="login-container">
        <img className="logo" src={logo} alt="Logo" />
        <div className="login-details">
          <Typography variant="h5" fontWeight="bold">
            Log in to Teams Check-in
          </Typography>
          <div className="login-action">
            <div className="login-text">
              <Typography className="text-field" variant="body1">
                Enter your team code
              </Typography>
              <TextField
                className="typography"
                label="Your code"
                type="password"
                variant="outlined"
                size="small"
                required
              />
            </div>
            <CustomButton className="button" variant="contained" fullWidth>
              Login
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageContainer;
