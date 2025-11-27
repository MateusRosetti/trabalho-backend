require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app'); 

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/trabalho_final';

mongoose.connect(MONGO_URL)
  .then(() => console.log('Conectado ao MongoDB'))
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
