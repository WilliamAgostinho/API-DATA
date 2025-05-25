const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const autenticarToken = require('../middlewares/autenticarToken');

router.post('/login', autenticarToken, authController.login);

module.exports = router;
