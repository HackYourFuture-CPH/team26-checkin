const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const getAllCheckinResponses = async () => {
  return knex('CheckinResponses').select('*');
};

const getCheckinResponseById = async (responseId) => {
  if (!responseId) {
    throw new HttpError('Response ID should be provided', 400);
  }

  try {
    const response = await knex('CheckinResponses')
      .select('*')
      .where({ response_id: responseId });
    if (response.length === 0) {
      throw new HttpError(
        `Check-in response with ID ${responseId} not found`,
        404,
      );
    }
    return response;
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
};

// Add other CRUD operations for Check-in Responses if needed...

module.exports = {
  getAllCheckinResponses,
  getCheckinResponseById,
};
