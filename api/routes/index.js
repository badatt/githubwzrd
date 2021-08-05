const express = require('express');
const repoRoutes = require('./repo.route');

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

module.exports = router;
