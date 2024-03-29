const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

const getAllCheckinQuestions = async () => {
  return knex('CheckinQuestions').select('*');
};

const getCheckinQuestionById = async (questionId) => {
  if (!questionId) {
    throw new HttpError('Question ID should be provided', 400);
  }

  try {
    const question = await knex('CheckinQuestions')
      .select('*')
      .where({ question_id: questionId });
    if (question.length === 0) {
      throw new HttpError(
        `Check-in question with ID ${questionId} not found`,
        404,
      );
    }
    return question;
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
};

// Add other CRUD operations for Check-in Questions if needed...

module.exports = {
  getAllCheckinQuestions,
  getCheckinQuestionById,
};
