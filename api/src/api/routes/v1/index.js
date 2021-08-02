const express = require('express');
const helloRoutes = require('./hello.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/hello', helloRoutes);

module.exports = router;
