
const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Título é obrigatório'],
    minlength: [3, 'Título deve ter ao menos 3 caracteres'],
    trim: true
  },
  descricao: {
    type: String,
    default: '',
    trim: true
  },
  concluida: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Tarefa', tarefaSchema);



