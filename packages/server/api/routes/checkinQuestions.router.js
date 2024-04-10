const express = require('express');
const router = express.Router();
const checkinQuestionsController = require('../controllers/checkinQuestions.controller');

// Get all checkin questions
router.get('/', async (req, res, next) => {
  try {
    const checkinQuestions =
      await checkinQuestionsController.getAllCheckinQuestions();
    res.json(checkinQuestions);
  } catch (error) {
    next(error);
  }
});

// Get checkin question by ID
router.get('/:id', async (req, res, next) => {
  const questionId = req.params.id;
  try {
    const checkinQuestion =
      await checkinQuestionsController.getCheckinQuestionsById(questionId);
    if (!checkinQuestion) {
      return res.status(404).send('Checkin question not found');
    }
    res.json(checkinQuestion);
  } catch (error) {
    next(error);
  }
});

// Create a new checkin question
router.post('/addCheckinQuestion', async (req, res, next) => {
  const checkinQuestionData = req.body;
  try {
    const newCheckinQuestion =
      await checkinQuestionsController.createCheckinQuestion(
        checkinQuestionData,
      );
    res.json(newCheckinQuestion);
  } catch (error) {
    next(error);
  }
});

// Update a checkin question by ID
router.patch('/:id', async (req, res, next) => {
  const questionId = req.params.id;
  const updatedCheckinQuestionData = req.body;
  try {
    const updatedCheckinQuestion =
      await checkinQuestionsController.editCheckinQuestion(
        questionId,
        updatedCheckinQuestionData,
      );
    res.json(updatedCheckinQuestion);
  } catch (error) {
    next(error);
  }
});

// Delete a checkin question by ID
router.delete('/:id', async (req, res, next) => {
  const questionId = req.params.id;
  try {
    const deletedCount = await checkinQuestionsController.deleteCheckinQuestion(
      questionId,
    );
    if (deletedCount === 0) {
      return res
        .status(404)
        .send('The checkin question ID you provided does not exist.');
    }
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
