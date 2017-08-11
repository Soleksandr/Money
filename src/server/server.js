const app = require('./app');
const models = require('./models');

const port = 3000;

models.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
