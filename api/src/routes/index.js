const express = require('express');
const repoRoutes = require('./repo.route');
const userRoutes = require('./user.route');

const router = express.Router();

/**
 * GET /status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET /docs
 */
router.use('/docs', express.static('docs'));

router.use('/repos', repoRoutes);
router.use('/me', userRoutes);

module.exports = router;
