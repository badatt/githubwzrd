const express = require('express');
const controller = require('../controllers/repo.controller');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

/**
 * GET /_meta
 */
router.route('/_meta', (req, res) => res.send('OK'));

router.route('/').get(authorize(), controller.all);

module.exports = router;
