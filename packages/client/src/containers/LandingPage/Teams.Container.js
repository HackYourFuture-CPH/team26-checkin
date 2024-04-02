import React, { useEffect, useState } from 'react';
import { apiURL } from '../../apiURL';
import './LandingPage.Style.css';

export const LandingPage = () => {
  const [teams, setteams] = useState([]);
  useEffect(() => {
    async function fetchteams() {
      const response = await fetch(`${apiURL()}/Teams`);
      const examples = await response.json();
      setteams(examples);
    }

    fetchteams();
  }, []);

  return (
    <div className="landing-page-container">
      <span>Home Page</span>
      <h1>Login</h1>
      {teams.map((example) => (
        <div key={example.id}>{example.title}</div>
      ))}
    </div>
  );
};
