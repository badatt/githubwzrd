const express = require('express');
const controller = require('../controllers/user.controller');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(authorize(), controller.me);

module.exports = router;
