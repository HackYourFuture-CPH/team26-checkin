import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import logo from './logo-dark.svg';
import './NavigationBar.css';

const NavigationItem = ({ icon, name, to }) => (
  <div style={{ marginBottom: '20px' }}>
    <Button
      className="menu-icon"
      component={NavLink} // Use NavLink instead of Link
      to={to} // Navigation path
      style={({ isActive }) => ({
        // Function to apply styles conditionally based on active state
        textTransform: 'none',
        color: isActive ? 'white' : 'rgba(255, 255, 255, 0.5)', // Active item will be white
      })}
    >
      {icon}
      <Typography variant="body1">{name}</Typography>
    </Button>
  </div>
);

NavigationItem.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

const LogoutButton = ({ onClick }) => (
  <Button
    className="menu-icon"
    style={{ textTransform: 'none' }}
    onClick={onClick}
  >
    <ExitToAppOutlinedIcon fontSize="large" />
    <Typography variant="body1">Log out</Typography>
  </Button>
);

LogoutButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const NavigationBar = () => {
  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout functionality here
  };

  return (
    <div className="left-nav-bar-container">
      <img className="logo" src={logo} alt="Logo" />
      <div className="left-nav-bar">
        <div className="left-nav-bar-top">
          <NavigationItem
            icon={<HomeOutlinedIcon fontSize="large" />}
            name="Dashboard"
            to="/dashboard"
          />
          <NavigationItem
            icon={<HelpOutlineOutlinedIcon fontSize="large" />}
            name="Questions"
            to="/questions"
          />
          <NavigationItem
            icon={<DescriptionOutlinedIcon fontSize="large" />}
            name="Reports"
            to="/reportPage"
          />
        </div>
        <div className="left-nav-bar-bottom">
          <LogoutButton onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
