const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const rootRouter = require('./routers/root').router;
const registrationRouter = require('./routers/registration').router;
const authenticationRouter = require('./routers/authentication').router;
const logoutRouter = require('./routers/logout').router;
const indexPage = require('./handlers/indexPage');
const db = require('./models').db;
const schema = require('./graphql/schema');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('static'));
app.use(session({
  secret: 'asfoxcnueoijsdfj',
  saveUninitialized: false,
  store: new SequelizeStore({ db }),
  resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/backend/registration', registrationRouter);
app.use('/backend/authentication', authenticationRouter);
app.use('/backend/logout', logoutRouter);
app.use('/backend', rootRouter);
app.use('/graphql', (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}, graphqlExpress(request => ({ schema, rootValue: request.session })));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.all('*', indexPage);

module.exports = app;
