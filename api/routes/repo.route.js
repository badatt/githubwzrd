const express = require('express');
const controller = require('../controllers/repo.controller');
const { authorize } = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(authorize(), controller.all);

module.exports = router;
