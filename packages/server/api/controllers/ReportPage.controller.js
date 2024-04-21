// userQuestions.controller.js

const knex = require('../../config/db');

// Get all user questions
const getAllUserQuestions = async () => {
  try {
    return await knex('CheckinResponses').select('*');
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUserQuestions,
};
