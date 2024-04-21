/* eslint-disable no-console */

const app = require('./app');
const teamsRouter = require('./routes/teams.router');
const checkinResponsesRouter = require('./routes/checkinResponses.router');

app.use('/api/teams', teamsRouter);
app.use('/api/checkinResponses', checkinResponsesRouter);

const port = process.env.PORT || 3000; // Change port as needed

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
