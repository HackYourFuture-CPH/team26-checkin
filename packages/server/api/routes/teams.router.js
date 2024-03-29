/* eslint-disable no-console */

const express = require('express');

const router = express.Router();
const teamsController = require('../controllers/teams.controller');

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await teamsController.getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { team_code } = req.body;

  // Check if team code is valid
  const isValidTeamCode = await teamsController.isValidTeamCode(team_code);

  if (isValidTeamCode) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid team code. Please try again.' });
  }
});

module.exports = router;
