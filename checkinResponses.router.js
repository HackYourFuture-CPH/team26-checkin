const express = require('express');
const router = express.Router();
const checkinResponsesController = require('../controllers/checkinResponses.controller');

router.get('/', (req, res, next) => {
  checkinResponsesController
    .getAllCheckinResponses()
    .then((result) => res.json(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  checkinResponsesController
    .getCheckinResponseById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/', (req, res) => {
  checkinResponsesController
    .createCheckinResponse(req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      res.status(400).send('Bad request').end();
    });
});

router.patch('/:id', (req, res, next) => {
  checkinResponsesController
    .editCheckinResponse(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch(next);
});

router.delete('/:id', (req, res) => {
  checkinResponsesController
    .deleteCheckinResponse(req.params.id)
    .then((result) => {
      if (result === 0) {
        res
          .status(404)
          .send('The check-in response ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
