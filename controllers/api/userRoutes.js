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
      res.status(201).json(newUser);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// // Create a new user
// router.post('/signup', async (req, res) => {
//   try {
//     // Logic for handling user signup
//     const { username, email, password } = req.body;
//     const newUser = await User.create({ username, email, password });
//     res.status(201).json(newUser);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

// User login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
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
