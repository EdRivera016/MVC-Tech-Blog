const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new user
router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
        message: "Sign up successful!"
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to sign up. Please try again." });
  }
});

// User login
// Login route
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json({
        user: {
          id: userData.id,
          username: userData.username,
          email: userData.email
        },
        message: "Logged in successfully!"
      });
    });

  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to login. Please try again." });
  }
});

// User logout
router.post('/logout', withAuth, (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
