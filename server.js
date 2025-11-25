// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/authRouter');
const tarefasRouter = require('./routes/tarefasRouter');

const app = express();
app.use(express.json());

// Conexão com MongoDB
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/trabalho_final';
mongoose.connect(MONGO_URL)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

// Montar rotas com versionamento
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tarefas', tarefasRouter);

// Rota raiz com documentação mínima
app.get('/', (req, res) => {
  res.json({
    service: 'API de Tarefas',
    version: 'v1',
    routes: {
      register: 'POST /api/v1/auth/register',
      login: 'POST /api/v1/auth/login',
      listTarefas: 'GET /api/v1/tarefas',
      createTarefa: 'POST /api/v1/tarefas (protegido)',
      updateTarefa: 'PUT /api/v1/tarefas/:id (protegido)',
      deleteTarefa: 'DELETE /api/v1/tarefas/:id (protegido)'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

