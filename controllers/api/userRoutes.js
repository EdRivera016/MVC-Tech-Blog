// const router = require('express').Router();
// const { User } = require('../../models');
// const withAuth = require('../../utils/auth');

// // Create a new user
// router.post('/signup', async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);
//     req.session.save(() => {
//       req.session.user_id = newUser.id;
//       req.session.logged_in = true;
//       res.status(201).json({
//         id: newUser.id,
//         username: newUser.username,
//         email: newUser.email,
//         createdAt: newUser.createdAt,
//         updatedAt: newUser.updatedAt,
//         message: "Sign up successful!"
//       });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to sign up. Please try again." });
//   }
// });

// // Fetch all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.findAll();
//     res.status(200).json(users);
//   } catch (err) {
//     console.error('Error fetching users:', err);
//     res.status(500).json({ message: 'Internal server error. Please try again later.' });
//   }
// });

// // User login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const userData = await User.findOne({ where: { email } });

//     if (!userData || !(await userData.checkPassword(password))) {
//       return res.status(400).json({ message: 'Failed to login. Please check your credentials and try again.' });
//     }

//     req.session.user_id = userData.id;
//     req.session.logged_in = true;
//     req.session.save(() => {
//       res.json({ user: userData, message: 'You are now logged in!' });
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Internal server error. Please try again later.' });
//   }
// });
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     if (!email || !password) {
// //       return res.status(400).json({ message: "Email and password are required" });
// //     }

// //     const userData = await User.findOne({ where: { email } });

// //     if (!userData) {
// //       return res.status(400).json({ message: "Incorrect email or password" });
// //     }

// //     const validPassword = await userData.checkPassword(password);

// //     if (!validPassword) {
// //       return res.status(400).json({ message: "Incorrect email or password" });
// //     }

// //     req.session.save(() => {
// //       req.session.user_id = userData.id;
// //       req.session.logged_in = true;
// //       res.status(200).json({
// //         user: {
// //           id: userData.id,
// //           username: userData.username,
// //           email: userData.email
// //         },
// //         message: "Logged in successfully!"
// //       });
// //     });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Failed to login. Please try again." });
// //   }
// // });


// // User logout
// router.post('/logout', withAuth, (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

const router = require('express').Router();
const { User } = require('../../models');

// User signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });

    req.session.user_id = newUser.id;
    req.session.logged_in = true;
    req.session.save(() => {
      res.status(200).json({ user: newUser, message: 'You are now signed up!' });
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});

// Fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});

// User login
// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ where: { email } });

    if (!userData || !(await userData.checkPassword(password))) {
      return res.status(400).json({ message: 'Failed to login. Please check your credentials and try again.' });
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    await req.session.save(); // Wait for session to save

    // Optionally, redirect to home page after saving session
    res.redirect('/'); // This will cause a new request and thus a new response

    // Alternatively, respond with a JSON message (only if not redirecting)
    // res.json({ user: userData, message: 'You are now logged in!' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error. Please try again later.' });
  }
});


// User logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
