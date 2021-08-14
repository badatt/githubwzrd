const express = require('express');
const controller = require('../controllers/user.controller');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

/**
 * GET /_meta
 */
router.route('/_meta').get((req, res) => res.send('OK'));

router.route('/').get(authorize(), controller.me);

module.exports = router;
