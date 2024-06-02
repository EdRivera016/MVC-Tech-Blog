const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    //logic for fetching and rendering the homepage
});

module.exports = router;