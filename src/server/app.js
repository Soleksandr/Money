const express = require('express');
const bodyParser = require('body-parser');
const transactionsRouter = require('./routers/transactions').router;
const usersRouter = require('./routers/users').router;
const loginRouter = require('./routers/login').router;
const indexPage = require('./routers/indexPage');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use('/transactions', transactionsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.all('*', indexPage);

module.exports = app;
