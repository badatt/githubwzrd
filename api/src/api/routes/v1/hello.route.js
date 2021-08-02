const express = require('express');
const controller = require('../../controllers/hello.controller');

const router = express.Router();

router.route('/').get(controller.hello);

module.exports = router;
