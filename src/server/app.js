const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const transactionsRouter = require('./routers/transactions').router;
const usersRouter = require('./routers/users').router;
const loginRouter = require('./routers/login').router;
const indexPage = require('./routers/indexPage');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use(session({
  secret: 'ghbrtwsggujm',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: true },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/transactions', transactionsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.all('*', indexPage);

module.exports = app;
