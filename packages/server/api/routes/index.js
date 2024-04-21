// /* eslint-disable */
// const express = require('express');
// const router = express.Router();
// const teams = require('./teams.router');
// const teamMembersRouter = require('./teamMembers.router');
// const checkinQuestionsRouter = require('./checkinQuestions.router');

// // Home route
// router.get('/', (req, res) => {
//   res.send('Welcome to the home page!');
// });

// // Include your teams router
// router.use('/teams', teams);
// router.use('/teamMembers', teamMembersRouter);
// router.use('/checkinQuestions', checkinQuestionsRouter);

// module.exports = router;

const express = require('express');
const router = express.Router();
const teamsRouter = require('./teams.router');
const teamMembersRouter = require('./teamMembers.router');
const checkinQuestionsRouter = require('./checkinQuestions.router');
const reportPageRouter = require('./reportPage.router'); // Import the correct router

// Home route
router.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Include your teams, teamMembers, checkinQuestions, and reportPage routers
router.use('/teams', teamsRouter);
router.use('/teamMembers', teamMembersRouter);
router.use('/checkinQuestions', checkinQuestionsRouter);
router.use('/reportPage', reportPageRouter); // Include the reportPage router

module.exports = router;
