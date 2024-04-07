const knex = require('../../config/db');

// Get all team members
const getAllTeamMembers = async () => {
  try {
    return await knex('TeamMembers').select('*');
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get team member by ID
const getTeamMemberById = async (memberId) => {
  try {
    return await knex('TeamMembers')
      .select('*')
      .where({ member_id: memberId })
      .first();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new team member
const createTeamMember = async (teamMemberData) => {
  try {
    return await knex('TeamMembers').insert(teamMemberData);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a team member by ID
const editTeamMember = async (memberId, updatedTeamMemberData) => {
  try {
    return await knex('TeamMembers')
      .where({ member_id: memberId })
      .update(updatedTeamMemberData); // Issue is here
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a team member by ID
const deleteTeamMember = async (memberId) => {
  try {
    return await knex('TeamMembers').where({ member_id: memberId }).del();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  editTeamMember,
  deleteTeamMember,
};
