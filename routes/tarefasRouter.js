// routes/tarefasRouter.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const tarefasController = require('../controllers/tarefasController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas de leitura
router.get('/', (req, res, next) => { // listar (público ou filtrado por user se autenticado)
  // leave req.user undefined if no token: we may allow public read
  next();
}, tarefasController.listar);

router.get('/:id', tarefasController.buscarPorId);

// Rotas protegidas: precisam de token
const validaTarefa = [
  body('titulo').optional().isString().isLength({ min: 3 }).withMessage('Título deve ter ao menos 3 caracteres'),
  body('descricao').optional().isString()
];

router.post('/', authMiddleware, [
  body('titulo').isString().isLength({ min: 3 }).withMessage('Título obrigatório com ao menos 3 caracteres'),
  body('descricao').optional().isString()
], (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });
  return tarefasController.criar(req, res);
});

router.put('/:id', authMiddleware, validaTarefa, (req, res) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) return res.status(400).json({ erros: erros.array() });
  return tarefasController.atualizar(req, res);
});

router.delete('/:id', authMiddleware, tarefasController.remover);

module.exports = router;

