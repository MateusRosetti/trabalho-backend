
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const tarefasController = require('../controllers/tarefasController');
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/', (req, res, next) => { 
  
  next();
}, tarefasController.listar);

router.get('/:id', tarefasController.buscarPorId);


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

