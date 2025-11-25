
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');

const tarefasRouter = require('./routes/tarefasRouter');

const app = express();


app.use(express.json()); 


app.use('/tarefas', tarefasRouter);

app.get('/', (req, res) => {
  res.send('API de Tarefas - funcionando');
});


const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tarefasdb';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar no MongoDB:', err.message);
    process.exit(1);
  });

app.listen(3000, () => console.log("API rodando na porta 3000"));

