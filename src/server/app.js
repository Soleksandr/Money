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
const indexPage = require('./routers/indexPage');
const db = require('./models').db;


const app = express();

const authenticationMiddleware = () =>
  (req, res, next) => {
    console.log('lasdfjlasdfjlaskdjflasdfj;lasdfjdlsaf', req.originalUrl)
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
    if (req.isAuthenticated()) {
      return next();
    } else if (req.originalUrl === '/registration') {
      return app.use('/registration', registrationRouter);
    } else if (req.originalUrl === '/login') {
      return loginRouter(req, res);
    }
    return indexPage(req, res);
  };


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

app.use('/', authenticationMiddleware());
app.use('/transactions', transactionsRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.all('*', indexPage);

module.exports = app;
