const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Render the login page
router.get('/login', (req, res) => {
  try {
    res.render('login', { title: 'Login' });
  } catch (err) {
    console.error('Error rendering login page:', err);
    res.status(500).json(err);
  }
});

// Render the signup page
router.get('/signup', (req, res) => {
  try {
    res.render('signup', { title: 'Sign Up' });
  } catch (err) {
    console.error('Error rendering signup page:', err);
    res.status(500).json(err);
  }
});

// Render the homepage with all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('home', { 
      posts, 
      title: 'Home',
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json(err);
  }
});

// Render the dashboard with posts by the logged-in user
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
      title: 'Dashboard',
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching dashboard posts:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
