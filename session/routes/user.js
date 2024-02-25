const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Aquí iría tu modelo de usuario
const User = require('../models/User');

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect('/products');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Aquí iría el código para guardar el nuevo usuario en la base de datos
    const newUser = new User({
      email: req.body.email,
      password: hash,
      role: 'user'
    });
    newUser.save(function(err) {
      if (err) {
        // Manejar error
      } else {
        res.redirect('/login');
      }
    });
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
