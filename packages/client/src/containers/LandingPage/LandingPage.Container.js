// import React, { useState } from 'react';
// import { apiURL } from '../../apiURL';
// import './LandingPage.Style.css';

// const LandingPage = () => {
//   const [teamCode, setTeamCode] = useState('');
//   const [loginStatus, setLoginStatus] = useState(null);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`${apiURL()}/teams/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ team_code: teamCode }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       setLoginStatus('success');
//     } catch (error) {
//       setLoginStatus('failure');
//     }
//   };

//   return (
//     <div className="landing-page-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div className="form-group">
//           <label htmlFor="teamCode">Team Code:</label>
//           <input
//             type="text"
//             id="teamCode"
//             value={teamCode}
//             onChange={(e) => setTeamCode(e.target.value)}
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {loginStatus === 'success' && <p>Login successful</p>}
//       {loginStatus === 'failure' && (
//         <p>Login unsuccessful. Please try again.</p>
//       )}
//     </div>
//   );
// };

// export { LandingPage };

import React from 'react';
import Testimonials from '../../components/Login/Testimonials';
import logo from './logo.svg';
import { Typography, TextField, Button } from '@mui/material';
import styled from '@emotion/styled';
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
