const app = require('./app');
const teamsRouter = require('./routes/teams.router');

app.use('/api/teams', teamsRouter);

const port = process.env.PORT || 3000; // Use process.env.PORT or default to port 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
