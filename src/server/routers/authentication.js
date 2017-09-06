const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
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

passport.use(new FacebookStrategy({
  clientID: '1401681656606305',
  clientSecret: 'ade813d249e2a9603b31de0c85a1a826',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
}, (accessToken, refreshToken, profile, done) => {
  console.log('----------------------------------profile----------------------------', profile);
  console.log('----------------------------------profile----------------------------', accessToken);
  console.log('----------------------------------profile----------------------------', refreshToken);
  console.log('----------------------------------profile----------------------------', done);
  return done(null, profile);
  // const me = new user({
  //   email: profile.emails[0].value,
  //   name: profile.displayName,
  // });
}));

//   /* save if new */
//   user.findOne({email:me.email}, function(err, u) {
//       if(!u) {
//           me.save(function(err, me) {
//               if(err) return done(err);
//               done(null,me);
//           });
//       } else {
//           console.log(u);
//           done(null, u);
//       }
//   });
// }
// ));

const login = (req, res) => {
  res.json(req.user);
};

router.post('/', passport.authenticate('local'), login);
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/',
  }));

module.exports = {
  router,
  login,
};
