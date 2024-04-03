const knex = require('../../config/db');
/* eslint-disable no-unused-vars */
const HttpError = require('../lib/utils/http-error');
/* eslint-enable no-unused-vars */

const getTeams = async () => {
  try {
    // Select all fields from the Teams table
    return await knex('Teams').select('*');
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
};

const getTeamById = async (teamId) => {
  if (!teamId) {
    throw new HttpError('Team ID should be provided', 400);
  }

  try {
    const team = await knex('Teams').select('*').where({ team_id: teamId });
    if (team.length === 0) {
      throw new HttpError(`Team with ID ${teamId} not found`, 404);
    }
    return team;
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
};

const editTeam = async (teamId, updatedTeamData) => {
  if (!teamId) {
    throw new HttpError('Team ID should be provided', 400);
  }

  try {
    return await knex('Teams')
      .where({ team_id: teamId })
      .update(updatedTeamData);
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
};

const deleteTeam = async (teamId) => {
  if (!teamId) {
    throw new HttpError('Team ID should be provided', 400);
  }

  try {
    return await knex('Teams').where({ team_id: teamId }).del();
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
};

const createTeam = async (teamData) => {
  try {
    return await knex('Teams').insert(teamData);
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
};

const getTeamByCode = async (teamCode) => {
  try {
    const team = await knex('Teams').where({ team_code: teamCode }).first();
    return !!team;
  } catch (error) {
    console.error('Error checking team code:', error);
    return false;
  }
};

module.exports = {
  getTeams,
  getTeamById,
  editTeam,
  deleteTeam,
  createTeam,
  getTeamByCode,
};
