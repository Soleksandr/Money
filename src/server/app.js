const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./routes/start')(app);
require('./routes/users')(app);
require('./routes/transactions')(app);

app.use(express.static('static'));

module.exports = app;
