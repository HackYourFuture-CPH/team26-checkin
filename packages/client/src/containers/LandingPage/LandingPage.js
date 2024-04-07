import React from 'react';
import Testimonials from '../../components/Login/Testimonials';
import logo from './logo.svg';
import { Typography, TextField, Button } from '@mui/material';
import './LandingPage.Style.css';

const LandingPageContainer = () => {
  return (
    <div className="landing-page">
      <div className="testimonial-container">
        <Typography className="text-field" variant="h4">
          Don’t forget to invite teammates!
        </Typography>
        <div className="testimonial-cards">
          <Testimonials />
        </div>
      </div>

      <div className="login-container">
        <img className="logo" src={logo} alt="Logo" />
        <div className="login-details">
          <Typography className="login-heading" variant="h5">
            Log in to Teams Check-in
          </Typography>
          <div className="login-action">
            <div className="login-text">
              <Typography className="text-field" variant="body1">
                Enter your team code
              </Typography>
              <TextField
                className="team-code"
                label="Your code"
                type="password"
                variant="outlined"
                size="small"
                required
              />
            </div>
            <Button className="button" variant="contained" fullWidth>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageContainer;
