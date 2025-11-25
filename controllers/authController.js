// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

function gerarToken(user) {
  const payload = { id: user._id, email: user.email, nome: user.nome };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
}

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const existe = await User.findOne({ email });
    if (existe) return res.status(409).json({ erro: 'Email já cadastrado' });

    const novoUser = await User.create({ nome, email, senha });
    const token = gerarToken(novoUser);

    return res.status(201).json({ user: { id: novoUser._id, nome: novoUser.nome, email: novoUser.email }, token });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao registrar usuário' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const senhaValida = await user.compararSenha(senha);
    if (!senhaValida) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = gerarToken(user);
    return res.status(200).json({ user: { id: user._id, nome: user.nome, email: user.email }, token });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao fazer login' });
  }
};
