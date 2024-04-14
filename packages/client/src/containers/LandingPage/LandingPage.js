import React, { useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';
import Testimonials from '../../components/Login/Testimonials';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import { Typography, TextField, Button } from '@mui/material';
import './LandingPage.css';
import { useTeamIdContext } from '../../hooks/contextHook';

export const LandingPageContainer = () => {
  const { teamId: globalTeamId, setTeamId: setGlobalTeamId } =
    useTeamIdContext();
  const [teamId, setTeamId] = useState(globalTeamId);
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL()}/teams/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_code: teamId }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      setLoginStatus('success');
      // Save team id if it the login was successful
      setGlobalTeamId(teamId);
      navigate('/dashboard/');
    } catch (error) {
      setLoginStatus('failure');
    }
  };

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
          <form className="login-text" onSubmit={handleLogin}>
            <Typography className="text-field" variant="body1">
              Enter your team code
            </Typography>
            <TextField
              className="team-code"
              label="Your code"
              type="password"
              variant="outlined"
              size="small"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="button"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </form>
          {loginStatus === 'success' && <p>Login successful</p>}
          {loginStatus === 'failure' && (
            <p>Login unsuccessful. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};
