import React from 'react';
import { Typography } from '@mui/material';
import NavigationBar from '../../components/Dashboard/NavigationBar';
import placeholder from './placeholder.png';
import './Dashboard.css';
import { TeamMembers } from '../../components/Dashboard/TeamMembers';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <NavigationBar />
      <div className="content-container">
        <div className="top-nav-bar">
          <div className="heading-text">
            <Typography variant="h4">Dashboard</Typography>
            <Typography className="sub-heading" variant="body1">
              Welcome back, Meraj
            </Typography>
          </div>

          <div className="image-container">
            <img
              className="placeholder-image"
              src={placeholder}
              alt="Placeholder"
            />
            <div className="name-mail-container">
              <Typography variant="h6">Meraj</Typography>
              <Typography className="subtext" variant="body2">
                meraj@gmail.com
              </Typography>
            </div>
          </div>
        </div>
        <TeamMembers />
      </div>
    </div>
  );
};

export default Dashboard;
