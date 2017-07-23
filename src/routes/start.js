const handler = require('../handlers/start');

module.exports = (app) => {
  app.get('/', (req, res) => {
    const data = handler.getData();
    if (data) {
      res.json(data);
    } else {
      res.setStatus(500);
    }
  });
};
