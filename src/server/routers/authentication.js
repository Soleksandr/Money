const express = require('express');
const passport = require('passport');
const handlers = require('../handlers/authentication');

const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res) => {
  console.log('------------ inside router /login -------------');
});

// passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });

module.exports = {
  router,
};
