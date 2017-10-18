var express = require('express'),
  router = express.Router(),
  User = require('../../models').User;

router.get("/register", function(req, res) {
  res.render('users/register');
});

router.post('/register', function(req, res) {
  if (req.body.password !== req.body.password_confirm) {
    res.format({
      html: function() {
        res.end('Passwords must match');
      },
      json: function() {
        res.status(400).json({ error: 'Passwords must match' });
      }
    });
  } else {
    User.findOne({ where: { username: req.body.username }})
      .then(function(existingUser) {
        if (existingUser) {
          res.format({
            html: function() {
              res.end('User already exists')
            },
            json: function() {
              res.status(400).json({ error: 'User already exists '});
            }
          })
        } else {
          User.create(req.body).then(function(user) {
            req.session.user_id = user.id;
            req.session.save(function() {
              res.format({
                html: function() {
                  res.redirect('/');
                },
                json: function() {
                  res.json(user);
                }
              });
            });
          });
        }
      });
  }
});

router.get('/current', function(req, res) {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ error: 'No current user' });
    }
});

router.get('/login', function(req, res) {
  res.render('users/login');
});

router.post('/login', function(req, res) {
  User.findOne({ where: { username: req.body.username }})
    .then(function(user) {
      res.format({
        html: function() {
          if (!user) {
            res.end('User not found');
          } else if (user.isValidPassword(req.body.password)) {
            req.session.user_id = user.id;
            req.session.save(function() {
              res.redirect('/');
            });
          } else {
            res.end('Password incorrect');
          }
        },
        json: function() {
          if (!user) {
            res.status(401).json({ error: 'User does not exist' });
          } else if (user.isValidPassword(req.body.password)) {
            req.session.user_id = user.id;
            req.session.save(function() {
              res.json(user);
            });
          } else {
            res.status(401).json({ error: 'Password incorrect' });
          }
        }
      });
    });
});

router.post('/available', function(req, res) {
  User.findOne({ where: { username: req.body.username }})
    .then(function(user) {
      res.json({ isAvailable: !user });
    });
});

router.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.format({
      html: function() {
        res.redirect('/');
      },
      json: function() {
        res.json({ success: true });
      }
    });
  });
});

module.exports = router;
