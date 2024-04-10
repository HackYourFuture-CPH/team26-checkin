const knex = require('../../config/db');

// Get all checkin questions
const getAllCheckinQuestions = async () => {
  try {
    return await knex('CheckinQuestions').select('*');
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get checkin questions by ID
const getCheckinQuestionsById = async (questionId) => {
  try {
    return await knex('CheckinQuestions')
      .select('*')
      .where({ question_id: questionId })
      .first();
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a new checkin question
const createCheckinQuestion = async (checkinQuestionData) => {
  try {
    return await knex('CheckinQuestions').insert(checkinQuestionData);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a checkin question by ID
const editCheckinQuestion = async (questionId, updatedCheckinQuestionData) => {
  try {
    return await knex('CheckinQuestions')
      .where({ question_id: questionId })
      .update(updatedCheckinQuestionData);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a checkin question by ID
const deleteCheckinQuestion = async (questionId) => {
  try {
    return await knex('CheckinQuestions')
      .where({ question_id: questionId })
      .del();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllCheckinQuestions,
  getCheckinQuestionsById,
  createCheckinQuestion,
  editCheckinQuestion,
  deleteCheckinQuestion,
};
