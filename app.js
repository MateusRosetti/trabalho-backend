const express = require('express');

const authRouter = require('./routes/authRouter');
const tarefasRouter = require('./routes/tarefasRouter');

const app = express();
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tarefas', tarefasRouter);

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

module.exports = app;

