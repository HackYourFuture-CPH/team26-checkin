const express = require('express');
const router = express.Router();
const checkinQuestionsController = require('../controllers/checkinQuestions.controller');

router.get('/', (req, res, next) => {
  checkinQuestionsController
    .getAllCheckinQuestions()
    .then((result) => res.json(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  checkinQuestionsController
    .getCheckinQuestionById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/', (req, res) => {
  checkinQuestionsController
    .createCheckinQuestion(req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      res.status(400).send('Bad request').end();
    });
});

router.patch('/:id', (req, res, next) => {
  checkinQuestionsController
    .editCheckinQuestion(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch(next);
});

router.delete('/:id', (req, res) => {
  checkinQuestionsController
    .deleteCheckinQuestion(req.params.id)
    .then((result) => {
      if (result === 0) {
        res
          .status(404)
          .send('The check-in question ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
