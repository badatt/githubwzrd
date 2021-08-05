const express = require('express');
const controller = require('../controllers/hello.controller');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(authorize(), controller.hello);

module.exports = router;
