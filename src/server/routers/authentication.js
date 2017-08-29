const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const modelUser = require('../models/index').modelUser;

const router = express.Router();

passport.use(new LocalStrategy(
  (username, password, done) => {
    modelUser.findOne({
      where: {
        username,
      },
    }).then((u) => {
      if (!u) {
        done(null, false);
      } else {
        const user = u.get({ plain: true });
        const hash = user.password;
        bcrypt.compare(password, hash, (err, successful) => {
          if (successful) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      }
    });
  },
));

const login = (req, res) => {
  const user = req.user;
  req.login(req.user.id, () => {
    res.json({
      id: user.id,
      username: user.username,
      name: user.name,
      surname: user.surname,
    });
  });
};

router.post('/', passport.authenticate('local'), login);

module.exports = {
  router,
  login,
};
