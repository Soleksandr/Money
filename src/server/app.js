const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const rootRouter = require('./routers/root').router;
const transactionsRouter = require('./routers/transactions').router;
const usersRouter = require('./routers/users').router;
const registrationRouter = require('./routers/registration').router;
const authenticationRouter = require('./routers/authentication').router;
const logoutRouter = require('./routers/logout').router;
const indexPage = require('./handlers/indexPage');
const db = require('./models').db;

const authenticationMiddleware = () =>
(req, res, next) => {
  // console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
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

// app.use('*', (req,res,next) => {console.log('============ main router handler ========', req.originalUrl); next()})
app.use('/backend/registration', registrationRouter);
app.use('/backend/authentication', authenticationRouter);
app.use('/backend/logout', logoutRouter);
app.use('/backend/transactions', authenticationMiddleware(), transactionsRouter);
app.use('/backend/users', usersRouter);
app.use('/backend', rootRouter);
app.all('*', indexPage);

module.exports = app;
