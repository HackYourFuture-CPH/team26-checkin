import React from 'react';
import { Typography } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const navigationData = [
  { id: 1, name: 'Dashboard', icon: <HomeOutlinedIcon  fontSize="large" /> },
  { id: 2, name: 'Questions', icon: <HelpOutlineOutlinedIcon fontSize="large" /> },
  { id: 3, name: 'Reports', icon: <DescriptionOutlinedIcon  fontSize="large" /> },
];

const NavigationBar = () => {
  return (
    <div className="left-nav-bar">
      <div className="left-nav-bar-top">
        {navigationData.map(item => (
          <div className="menu-icon" key={item.id}>
            {item.icon}
            <Typography variant="body1">{item.name}</Typography>
          </div>
        ))}
      </div>

      <div className="left-nav-bar-bottom">
        <div className="menu-icon">
          <ExitToAppOutlinedIcon fontSize="large" />
          <Typography variant="body1">Log out</Typography>
        </div>
      </div>
    </div>  
  );
}

export default NavigationBar;
