const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutos
  max: 5, // máximo de 5 requisições
  message: 'Muitas tentativas de login. Tente novamente em 1 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter ,authController.login);

router.post('/register', authController.register);

module.exports = router;
