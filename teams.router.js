const express = require('express');
const router = express.Router();
const teamsController = require('../controllers/teams.controller');

router.get('/', (req, res, next) => {
  teamsController
    .getTeams()
    .then((result) => res.json(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  teamsController
    .getTeamById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/', (req, res) => {
  teamsController
    .createTeam(req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      res.status(400).send('Bad request').end();
    });
});

router.patch('/:id', (req, res, next) => {
  teamsController
    .editTeam(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch(next);
});

router.delete('/:id', (req, res) => {
  teamsController
    .deleteTeam(req.params.id)
    .then((result) => {
      if (result === 0) {
        res.status(404).send('The team ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
