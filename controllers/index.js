// controllers/index.js or routes.js
const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// Define routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
