/* eslint-disable */
const express = require('express');

const router = express.Router();

const teamMembersController = require('../controllers/teamMembers.controller');

// Get all team members
router.get('/', async (req, res, next) => {
  try {
    const teamMembers = await teamMembersController.getAllTeamMembers();
    res.json(teamMembers);
  } catch (error) {
    next(error);
  }
});

// Get team member by ID
router.get('/:id', async (req, res, next) => {
  const memberId = req.params.id;
  try {
    const teamMember = await teamMembersController.getTeamMemberById(memberId);
    if (!teamMember) {
      return res.status(404).send('Team member not found');
    }
    res.json(teamMember);
  } catch (error) {
    next(error);
  }
});

// Create a new team member
router.post('/addMember', async (req, res, next) => {
  const teamMemberData = req.body;
  try {
    const newTeamMember = await teamMembersController.createTeamMember(
      teamMemberData,
    );
    res.json(newTeamMember);
  } catch (error) {
    next(error);
  }
});

// Update a team member by ID
router.patch('/:id', async (req, res, next) => {
  const memberId = req.params.id;
  const updatedTeamMemberData = req.body;
  try {
    const updatedTeamMember = await teamMembersController.editTeamMember(
      memberId,
      updatedTeamMemberData,
    );
    res.json(updatedTeamMember);
  } catch (error) {
    next(error);
  }
});

// Delete a team member by ID
router.delete('/:id', async (req, res, next) => {
  const memberId = req.params.id;
  try {
    const deletedCount = await teamMembersController.deleteTeamMember(memberId);
    if (deletedCount === 0) {
      return res
        .status(404)
        .send('The team member ID you provided does not exist.');
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
