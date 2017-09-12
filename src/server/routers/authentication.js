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
      if (!u || u.dataValues.password === null) {
        done(null, false);
      } else {
        const user = u.get({ plain: true });
        const hash = user.password;
        bcrypt.compare(password, hash, (err, successful) => {
          if (successful) {
            const userData = {
              id: user.id,
              name: user.name,
              surname: user.surname,
              username: user.username,
            };
            done(null, userData);
          } else {
            done(null, null);
          }
        });
      }
    });
  },
));

const login = (req, res) => {
  res.json(req.user);
};

router.post('/', passport.authenticate('local'), login);

module.exports = {
  router,
  login,
};
