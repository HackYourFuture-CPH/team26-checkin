import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Typography, Button } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import logo from './logo-dark.svg';

// NavigationItem component for individual navigation items
// NavigationItem component for individual navigation items
const NavigationItem = ({ icon, name }) => (
  <div style={{ marginBottom: '40px' }}>
    <Button className="menu-icon" style={{ textTransform: 'none', color: name !== 'Dashboard' ? 'rgba(255, 255, 255, 0.5)' : 'white' }}>
      {icon}
      <Typography variant="body1">{name}</Typography>
    </Button>
  </div>
);


// Prop validation for NavigationItem component
NavigationItem.propTypes = {
  icon: PropTypes.node.isRequired, // Require icon prop of type node
  name: PropTypes.string.isRequired, // Require name prop of type string
};

// LogoutButton component for the logout button
const LogoutButton = () => (
  <Button className="menu-icon" style={{ textTransform: 'none' }}>
    <ExitToAppOutlinedIcon fontSize="large" />
    <Typography variant="body1">Log out</Typography>
  </Button>
);

const NavigationBar = () => {
  return (
    <div className="left-nav-bar-container">
      <img className="logo" src={logo} alt="Logo" />
      <div className="left-nav-bar">
        <div className="left-nav-bar-top">
          {/* Reusing NavigationItem component */}
          <NavigationItem icon={<HomeOutlinedIcon fontSize="large" />} name="Dashboard" />
          <NavigationItem icon={<HelpOutlineOutlinedIcon fontSize="large" />} name="Questions" />
          <NavigationItem icon={<DescriptionOutlinedIcon fontSize="large" />} name="Reports" />
        </div>
        <div className="left-nav-bar-bottom">    
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
