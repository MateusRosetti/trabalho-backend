// routes/authRouter.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// registro
router.post('/register', [
  body('nome').isString().isLength({ min: 3 }).withMessage('Nome com ao menos 3 caracteres'),
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha com ao menos 6 caracteres')
], (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });
  return authController.register(req, res);
});

// login
router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('senha').exists().withMessage('Senha obrigatória')
], (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });
  return authController.login(req, res);
});

module.exports = router;
