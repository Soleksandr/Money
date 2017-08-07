const express = require('express');
const bodyParser = require('body-parser');
const transactionsRouter = require('./routers/transactions').router;
const usersRouter = require('./routers/users').router;
const indexPage = require('./routers/indexPage');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/transactions', transactionsRouter);
app.use('/users', usersRouter);
app.use('/', indexPage);
app.all('*', indexPage);

app.use(express.static('static'));

module.exports = app;
