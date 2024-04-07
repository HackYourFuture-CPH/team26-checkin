/* eslint-disable no-console */

const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const getAllTeams = async () => {
  return knex('Teams').select('*');
};
const isValidTeamCode = async (teamCode) => {
  try {
    const team = await knex('Teams').where({ team_code: teamCode }).first();
    return !!team;
  } catch (error) {
    console.error('Error checking team code:', error);
    return false;
  }
};

const getteams = async () => {
  return knex('teams').select('teams.id', 'teams.title');
};

const getExampleResourceById = async (id) => {
  if (!id) {
    throw new HttpError('Id should be a number', 400);
  }

  try {
    const teams = await knex('teams')
      .select('teams.id as id', 'title')
      .where({ id });
    if (teams.length === 0) {
      throw new Error(`incorrect entry with the id of ${id}`, 404);
    }
    return teams;
  } catch (error) {
    return error.message;
  }
};

/// from the boiler plate template (will be used later)

const editExampleResource = async (
  exampleResourceId,
  updatedExampleResource,
) => {
  if (!exampleResourceId) {
    throw new HttpError('exampleResourceId should be a number', 400);
  }

  return knex('teams').where({ id: exampleResourceId }).update({
    title: updatedExampleResource.title,
    updatedAt: moment().format(),
  });
};

const deleteExampleResource = async (exampleResourceId) => {
  return knex('teams').where({ id: exampleResourceId }).del();
};

const createExampleResource = async (body) => {
  await knex('teams').insert({
    title: body.title,
  });

  return {
    successful: true,
  };
};

module.exports = {
  getteams,
  getExampleResourceById,
  deleteExampleResource,
  createExampleResource,
  editExampleResource,
  getAllTeams,
  isValidTeamCode,
};
