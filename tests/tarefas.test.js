const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/userModel");

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);

  
  await User.deleteMany({});

  
  await User.create({
    nome: "Mateus de Teste",
    email: "mateus@example.com",
    senha: "minhasenha"
  });

  
  const res = await request(app)
    .post("/api/v1/auth/login")
    .send({
      email: "mateus@example.com",
      senha: "minhasenha"
    });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Testes das Rotas de Tarefas", () => {
  it("Lista tarefas", async () => {
    const res = await request(app)
      .get("/api/v1/tarefas");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

