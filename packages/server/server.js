/* eslint-disable no-console */

const app = require('./app');
const teamsRouter = require('./routes/teams.router');

app.use('/api/teams', teamsRouter);

const port = process.env.PORT || 3000; // Change port as needed

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
