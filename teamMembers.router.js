const express = require('express');
const router = express.Router();
const teamMembersController = require('../controllers/teamMembers.controller');

router.get('/', (req, res, next) => {
  teamMembersController
    .getAllTeamMembers()
    .then((result) => res.json(result))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  teamMembersController
    .getTeamMemberById(req.params.id)
    .then((result) => res.json(result))
    .catch(next);
});

router.post('/', (req, res) => {
  teamMembersController
    .createTeamMember(req.body)
    .then((result) => res.json(result))
    .catch((error) => {
      console.log(error);
      res.status(400).send('Bad request').end();
    });
});

router.patch('/:id', (req, res, next) => {
  teamMembersController
    .editTeamMember(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch(next);
});

router.delete('/:id', (req, res) => {
  teamMembersController
    .deleteTeamMember(req.params.id)
    .then((result) => {
      if (result === 0) {
        res.status(404).send('The team member ID you provided does not exist.');
      } else {
        res.json({ success: true });
      }
    })
    .catch((error) => console.log(error));
});

module.exports = router;
