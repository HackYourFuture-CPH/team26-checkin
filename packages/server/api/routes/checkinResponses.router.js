const express = require('express');
const router = express.Router();
const responsesController = require('../controllers/checkinResponses.controller');

router.get('/', async (req, res) => {
  const responses = await responsesController.getAllResponses();
  res.json(responses);
});

router.get('/questions/:questionId', async (req, res) => {
  const responses = await responsesController.getResponsesByQuestionId(
    req.params.questionId,
  );
  res.json(responses);
});

router.get('/:responseId', async (req, res) => {
  const response = await responsesController.getResponseById(
    req.params.responseId,
  );
  res.json(response);
});

router.post('/', async (req, res) => {
  // const teamCode = req.headers.x_team_id
  const newResponse = await responsesController.addResponse(req.body);
  res.status(201).json(newResponse);
});

router.patch('/:responseId', async (req, res) => {
  const updatedResponse = await responsesController.updateResponse(
    req.params.responseId,
    req.body,
  );
  res.json(updatedResponse);
});

router.delete('/:responseId', async (req, res) => {
  await responsesController.deleteResponse(req.params.responseId);
  res.status(204).send();
});

module.exports = router;
