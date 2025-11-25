const request = require("supertest");
const app = require("../server");

describe("Testes de Autenticação", () => {

  it("Deve realizar login e retornar token", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "mateus@example.com",
        senha: "minhasenha"
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

});
