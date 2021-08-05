const express = require('express');
const helloRoutes = require('./hello.route');

const router = express.Router();

/**
 * GET /status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET /docs
 */
router.use('/docs', express.static('docs'));

router.use('/hello', helloRoutes);

module.exports = router;
