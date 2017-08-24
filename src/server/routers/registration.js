const express = require('express');
const handlers = require('../handlers/registration');
const passport = require('passport');

const router = express.Router();

// const authenticationMiddleware = dataToReturn =>
//   (req, res, next) => {
//     console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.json(dataToReturn);
//   };

const createUser = (req, res) =>
  handlers.createUser(req.body).then((user) => {
    // console.log('==============user===============', user);
    if (user) {
      req.login(user.id, () => {
        res.json({
          id: user.id,
          username: user.username,
          name: user.name,
          surname: user.surname,
        });
      });
    } else {
      res.sendStatus(500);
    }
  });

router.post('/', (req, res) => {
  createUser(req, res);
});

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((id, done) => {
  done(null, id);
});


module.exports = {
  router,
  createUser,
};
