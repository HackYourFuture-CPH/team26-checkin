const knex = require('../../config/db');

// Get all team members by team code
const getTeamMembersByCode = async (teamCode) => {
  try {
    const team = await knex('Teams').where({ team_code: teamCode }).first();
    if (!team) throw new Error('Team not found');
    return await knex('TeamMembers')
      .where({ team_id: team.team_id })
      .select('*');
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get team member by ID
const getTeamMemberById = async (memberId) => {
  try {
    const member = await knex('TeamMembers')
      .select('*')
      .where({ member_id: memberId })
      .first();
    if (!member) throw new Error('Team member not found');
    return member;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new team member
const createTeamMember = async (teamMemberData) => {
  try {
    const { team_code, first_name, last_name } = teamMemberData;
    const team = await knex('Teams').where({ team_code }).first();
    if (!team) throw new Error('Team not found');

    const newMemberId = await knex('TeamMembers').insert({
      team_id: team.team_id,
      first_name,
      last_name,
    });

    return await getTeamMemberById(newMemberId[0]); // Assuming insert returns the ID of the new record
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a team member by ID
const editTeamMember = async (memberId, updatedTeamMemberData) => {
  try {
    const updateCount = await knex('TeamMembers')
      .where({ member_id: memberId })
      .update(updatedTeamMemberData);
    if (updateCount === 0)
      throw new Error('Team member not found or update failed');
    return await getTeamMemberById(memberId);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a team member by ID
const deleteTeamMember = async (memberId) => {
  try {
    const deleteCount = await knex('TeamMembers')
      .where({ member_id: memberId })
      .del();
    if (deleteCount === 0) throw new Error('No team member found to delete');
    return deleteCount; // Returning the count of deleted records
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getTeamMembersByCode,
  getTeamMemberById,
  createTeamMember,
  editTeamMember,
  deleteTeamMember,
};
