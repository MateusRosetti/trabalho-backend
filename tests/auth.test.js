const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/userModel");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);

  await User.deleteMany({}); 

  await User.create({
    nome: "Mateus de Teste",
    email: "mateus@example.com",
    senha: "minhasenha"
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Testes de Autenticação", () => {
  it("Deve realizar login e retornar token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "mateus@example.com",
        senha: "minhasenha"
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
