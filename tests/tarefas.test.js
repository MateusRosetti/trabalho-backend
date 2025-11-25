const request = require("supertest");
const app = require("../server");

let token;

beforeAll(async () => {
  const login = await request(app)
    .post("/api/v1/auth/login")
    .send({
      email: "mateus@example.com",
      senha: "minhasenha"
    });

  token = login.body.token;
});

describe("Testes das Rotas de Tarefas", () => {

  it("Cria uma tarefa", async () => {
    const res = await request(app)
      .post("/api/v1/tarefas")
      .set("Authorization", "Bearer " + token)
      .send({
        titulo: "Estudar Node",
        descricao: "Praticar CRUD"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("Lista tarefas", async () => {
    const res = await request(app).get("/api/v1/tarefas");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
