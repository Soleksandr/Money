const app = require('./app');
const { db } = require('./models');

const port = 3000;

db.sync().then(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
