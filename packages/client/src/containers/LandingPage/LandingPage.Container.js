import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiURL } from '../../apiURL';
import './LandingPage.Style.css';

export const LandingPageContainer = () => {
  const navigate = useNavigate();
  const [teamCode, setTeamCode] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiURL()}/teams/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ team_code: teamCode }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      setLoginStatus('success');
      // Navigate to the dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      setLoginStatus('failure');
    }
  };

  return (
    <div className="landing-page-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="teamCode">Team Code:</label>
          <input
            type="text"
            id="teamCode"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loginStatus === 'success' && <p>Login successful</p>}
      {loginStatus === 'failure' && (
        <p>Login unsuccessful. Please try again.</p>
      )}
    </div>
  );
};
