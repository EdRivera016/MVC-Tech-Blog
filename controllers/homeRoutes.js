// controllers/homeRoutes.js
const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth'); // Import your withAuth middleware

router.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a login.handlebars or login.hbs template
});

router.get('/signup', (req, res) => {
    res.render('signup'); // Assuming you have a signup.handlebars or signup.hbs template
});

// router.get('/', async (req, res) => {
//   try {
//     const postData = await Post.findAll({
//       include: [{ model: User, attributes: ['username'] }],
//     });

//     const posts = postData.map((post) => post.get({ plain: true }));

//     res.render('home', { 
//       posts, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/', (req, res) => {
  console.log('Rendering home view');
  res.render('home', { title: 'Home' });
});

module.exports = router;


// Protected route with withAuth middleware
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
