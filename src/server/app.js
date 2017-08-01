const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/transactions', require('./routers/transactions'));
app.use('/users', require('./routers/users'));
app.use('/', require('./routers/start'));

app.use(express.static('static'));

module.exports = app;
