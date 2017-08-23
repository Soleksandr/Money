const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const rootRouter = require('./routers/root').router;
const transactionsRouter = require('./routers/transactions').router;
const usersRouter = require('./routers/users').router;
const registrationRouter = require('./routers/registration').router;
const authenticationRouter = require('./routers/authentication').router;
const indexPage = require('./handlers/indexPage');
const db = require('./models').db;

const authenticationMiddleware = () =>
(req, res, next) => {
  // console.log('lasdfjlasdfjlaskdjflasdfj;lasdfjdlsaf', req.originalUrl)
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

app.use('/backend', rootRouter);
app.use('/backend/authentication', authenticationRouter);
app.use('/backend/registration', registrationRouter);
app.use('/backend/transactions', authenticationMiddleware(), transactionsRouter);
app.use('/backend/users', authenticationMiddleware(), usersRouter);
app.all('*', indexPage);

passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('------------- user password', username, password)
    return done(null, 'asfd');
  },
));

module.exports = app;
