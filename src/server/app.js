const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const transactionsRouter = require('./routers/transactions').router;
const usersRouter = require('./routers/users').router;
const loginRouter = require('./routers/login').router;
const registrationRouter = require('./routers/registration').router;
const authenticationRouter = require('./routers/authentication').router;
const indexPage = require('./routers/indexPage');
const db = require('./models').db;

const authenticationMiddleware = () =>
(req, res, next) => {
  console.log('lasdfjlasdfjlaskdjflasdfj;lasdfjdlsaf', req.originalUrl)
  console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
  if (req.isAuthenticated()) {
    return next();
  }
  return res.json([]);
};

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('static'));
app.use(session({
  secret: 'asfoxcnueoijsdfj',
  saveUninitialized: false,
  store: new SequelizeStore({
    db,
  }),
  resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/backend/authentication', authenticationRouter);
app.use('/backend/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/transactions', authenticationMiddleware(), transactionsRouter);
app.use('/users', authenticationMiddleware(), usersRouter);
app.all('*', indexPage);

module.exports = app;
