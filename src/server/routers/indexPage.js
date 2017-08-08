const path = require('path');

const indexPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../../static/index.html'));
};

module.exports = indexPage;
