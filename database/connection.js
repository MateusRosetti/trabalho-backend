const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(" Conectado ao MongoDB");
  } catch (error) {
    console.error(" Erro ao conectar ao MongoDB:", error);
  }
}

module.exports = connectDB;
