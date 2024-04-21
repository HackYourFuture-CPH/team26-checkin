const { log } = require('winston');
const knex = require('../../config/db');

const getAllResponses = async () => {
  return await knex('CheckinResponses').select('*');
};

const getResponsesByQuestionId = async (questionId) => {
  return await knex('CheckinResponses')
    .where({ question_id: questionId })
    .select('*');
};

const getResponseById = async (responseId) => {
  return await knex('CheckinResponses')
    .where({ response_id: responseId })
    .first();
};

// Function to add a response
const addResponse = async (body) => {
  console.log('body', body);
  try {
    for (const questionId in body.responses) {
      const checkinResponse = {
        question_id: questionId,
        member_id: 3, // body.member_id
        response_text: body.responses[questionId],
      };
      const r = await knex('CheckinResponses').insert(checkinResponse);
      console.log({ r, checkinResponse });
    }

    return {};
  } catch (error) {
    throw new Error('Database insert failed: ' + error.message);
  }
};

const updateResponse = async (responseId, updatedData) => {
  await knex('CheckinResponses')
    .where({ response_id: responseId })
    .update(updatedData);
  return getResponseById(responseId);
};

const deleteResponse = async (responseId) => {
  await knex('CheckinResponses').where({ response_id: responseId }).del();
};

module.exports = {
  getAllResponses,
  getResponsesByQuestionId,
  getResponseById,
  addResponse,
  updateResponse,
  deleteResponse,
};
