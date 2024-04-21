// routes/reportPage.router.js

const express = require('express');
const router = express.Router();
const ReportPage = require('../controllers/ReportPage.controller');

// Get all user questions
router.get('/userQuestions', async (req, res, next) => {
  try {
    const userQuestions = await ReportPage.getAllUserQuestions();
    res.json(userQuestions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
