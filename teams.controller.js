const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const getTeams = async () => {
  return knex('Teams').select('*');
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

  return knex('Teams').where({ team_id: teamId }).update(updatedTeamData);
};

const deleteTeam = async (teamId) => {
  if (!teamId) {
    throw new HttpError('Team ID should be provided', 400);
  }

  return knex('Teams').where({ team_id: teamId }).del();
};

const createTeam = async (teamData) => {
  return knex('Teams').insert(teamData);
};

module.exports = {
  getTeams,
  getTeamById,
  editTeam,
  deleteTeam,
  createTeam,
};
