const express = require('express');
const router = express.Router();
const checkinQuestionsController = require('../controllers/checkinQuestions.controller');

// Middleware to normalize text inputs
const normalizeText = (req, res, next) => {
  if (req.body.question_text) {
    req.body.question_text = req.body.question_text.trim().toLowerCase();
  }
  next();
};

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
  try {
    const checkinQuestion =
      await checkinQuestionsController.getCheckinQuestionsById(req.params.id);
    if (!checkinQuestion) {
      res.status(404).json({ error: 'Checkin question not found' });
    } else {
      res.json(checkinQuestion);
    }
  } catch (error) {
    next(error);
  }
});

// Create a new checkin question
router.post('/', normalizeText, async (req, res, next) => {
  try {
    const newCheckinQuestion =
      await checkinQuestionsController.createCheckinQuestion(req.body);
    res.status(201).json(newCheckinQuestion);
  } catch (error) {
    if (error.message.includes('already exists')) {
      res.status(409).json({ error: error.message });
    } else {
      next(error);
    }
  }
});

// Update a checkin question by ID
router.patch('/:id', async (req, res, next) => {
  try {
    const result = await checkinQuestionsController.editCheckinQuestion(
      req.params.id,
      req.body,
    );
    if (result === 0) {
      res.status(404).json({
        error:
          'No checkin question found with that ID, or no changes were made',
      });
    } else {
      res.json({
        success: true,
        message: 'Checkin question updated successfully',
      });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a checkin question by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedCount = await checkinQuestionsController.deleteCheckinQuestion(
      req.params.id,
    );
    if (deletedCount === 0) {
      res.status(404).json({ error: 'No checkin question found with that ID' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
