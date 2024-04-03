const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams.controller');

// Get all teams
router.get('/', async (req, res, next) => {
  try {
    const teams = await teamsController.getAllTeams();
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

// Login route to fetch team by team_code
router.post('/login', async (req, res, next) => {
  try {
    const { team_code } = req.body;
    if (!team_code) {
      return res.status(400).send('Team code is required');
    }
    const team = await teamsController.getTeamByCode(team_code);
    if (!team) {
      return res.status(404).send('Team not found');
    }
    res.json(team);
  } catch (error) {
    next(error);
  }
});

// Create a new team
router.post('/', async (req, res, next) => {
  try {
    const teamData = req.body;
    const newTeam = await teamsController.createTeam(teamData);
    res.json(newTeam);
  } catch (error) {
    next(error);
  }
});

// Update a team by ID
router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTeamData = req.body;
    const updatedTeam = await teamsController.updateTeam(id, updatedTeamData);
    res.json(updatedTeam);
  } catch (error) {
    next(error);
  }
});

// Delete a team by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCount = await teamsController.deleteTeam(id);
    if (deleteCount === 0) {
      return res.status(404).send('The team ID you provided does not exist.');
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
