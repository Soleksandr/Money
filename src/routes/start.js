const handler = require('../handlers/start');

module.exports = (app) => {
  app.get('/', (req, res) => {
    const data = handler.getData();
    console.log('daat', data);
    if (data) {
      res.json(data);
    } else {
      res.setStatus(500);
    }
  });
};
