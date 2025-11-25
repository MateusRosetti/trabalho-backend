// controllers/tarefasController.js
const Tarefa = require('../models/tarefasModel');

// listar todas as tarefas do usuário logado
exports.listar = async (req, res) => {
  try {
    const filtro = { owner: req.user ? req.user.id : undefined };
    // se não estiver autenticado (rotas de leitura podem ser públicas), listar tudo se req.user undefined
    if (!filtro.owner) delete filtro.owner;

    const tarefas = await Tarefa.find(filtro).sort({ createdAt: -1 });
    return res.status(200).json(tarefas);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar tarefas' });
  }
};

exports.criar = async (req, res) => {
  try {
    const { titulo, descricao } = req.body;
    if (!req.user || !req.user.id) return res.status(401).json({ erro: 'Usuário não autenticado' });

    // regra de negócio: título obrigatório e minimo tratado também por validator / schema
    const nova = await Tarefa.create({
      titulo,
      descricao,
      owner: req.user.id
    });

    return res.status(201).json(nova);
  } catch (error) {
    // validação do Mongoose
    if (error.name === 'ValidationError') {
      const mensagens = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ erro: mensagens.join('; ') });
    }
    return res.status(500).json({ erro: 'Erro ao criar tarefa' });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    return res.status(200).json(tarefa);
  } catch (error) {
    return res.status(400).json({ erro: 'ID inválido' });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    // ownership: só o dono pode atualizar
    if (String(tarefa.owner) !== String(req.user.id)) {
      return res.status(403).json({ erro: 'Ação proibida: você não é o dono desta tarefa' });
    }

    // regra de negócio: não permitir atualizar concluida para true sem título válido
    if (req.body.concluida === true && (!req.body.titulo && !tarefa.titulo)) {
      return res.status(400).json({ erro: 'Não é possível marcar como concluída sem um título válido' });
    }

    Object.assign(tarefa, req.body);
    await tarefa.save();

    return res.status(200).json(tarefa);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const mensagens = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ erro: mensagens.join('; ') });
    }
    return res.status(500).json({ erro: 'Erro ao atualizar tarefa' });
  }
};

exports.remover = async (req, res) => {
  try {
    const tarefa = await Tarefa.findById(req.params.id);
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });

    // ownership
    if (String(tarefa.owner) !== String(req.user.id)) {
      return res.status(403).json({ erro: 'Ação proibida: você não é o dono desta tarefa' });
    }

    // regra de negócio exemplar: não permitir excluir tarefas já concluídas
    if (tarefa.concluida) {
      return res.status(400).json({ erro: 'Não é permitido excluir uma tarefa já concluída' });
    }

    await tarefa.remove();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao remover tarefa' });
  }
};

