const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');
const moment = require('moment-timezone');

const getAllTeamMembers = async () => {
  return knex('TeamMembers').select('*');
};

const getTeamMemberById = async (memberId) => {
  if (!memberId) {
    throw new HttpError('Member ID should be provided', 400);
  }

  try {
    const member = await knex('TeamMembers')
      .select('*')
      .where({ member_id: memberId });
    if (member.length === 0) {
      throw new HttpError(`Team member with ID ${memberId} not found`, 404);
    }
    return member;
  } catch (error) {
    throw new HttpError(error.message, 500);
  }
};

// Add other CRUD operations for Team Members if needed...

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
};
