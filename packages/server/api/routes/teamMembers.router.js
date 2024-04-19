const express = require('express');
const router = express.Router();
const teamMembersController = require('../controllers/teamMembers.controller');

// Get all team members for a specific team
router.get('/:code/members', async (req, res, next) => {
  const { code } = req.params;
  try {
    const teamMembers = await teamMembersController.getTeamMembersByCode(code);
    res.json(teamMembers);
  } catch (error) {
    next(error);
  }
});

// Get a specific team member by ID within a team
router.get('/:code/members/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const teamMember = await teamMembersController.getTeamMemberById(id);
    if (!teamMember) {
      return res.status(404).send('Team member not found');
    }
    res.json(teamMember);
  } catch (error) {
    next(error);
  }
});

// Create a new team member within a specific team
router.post('/:code/members', async (req, res, next) => {
  const { code } = req.params;
  const teamMemberData = { ...req.body, team_code: code };
  try {
    const newTeamMember = await teamMembersController.createTeamMember(
      teamMemberData,
    );
    res.status(201).json(newTeamMember);
  } catch (error) {
    next(error);
  }
});

// Update a team member by ID within a specific team
router.patch('/:code/members/:id', async (req, res, next) => {
  const { id } = req.params;
  const updatedTeamMemberData = req.body;
  try {
    const updatedTeamMember = await teamMembersController.editTeamMember(
      id,
      updatedTeamMemberData,
    );
    res.json(updatedTeamMember);
  } catch (error) {
    next(error);
  }
});

// Delete a team member by ID within a specific team
router.delete('/:code/members/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCount = await teamMembersController.deleteTeamMember(id);
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
