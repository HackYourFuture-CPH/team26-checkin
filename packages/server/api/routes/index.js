const express = require('express');

const router = express.Router();
const teams = require('./teams.router');

// Home route
router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Include your teams router
router.use('/teams', teams);

module.exports = router;
