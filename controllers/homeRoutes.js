// controllers/homeRoutes.js
const router = require('express').Router();
const { Post, User } = require('../models');

// Example routes
router.get('/login', (req, res) => {
  // Handle login page rendering
  res.render('login'); // Assuming you have a login.handlebars or login.hbs template
});

router.get('/signup', (req, res) => {
  // Handle signup page rendering
  res.render('signup'); // Assuming you have a signup.handlebars or signup.hbs template
});

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
