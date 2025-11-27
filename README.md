#  API RESTful de Gerenciamento de Tarefas  
Trabalho desenvolvido para a disciplina de Construção de Backend.


##  Integrantes do Grupo
- **Mateus Rosetti Da Rocha Ribeiro** (2314290085)


##  Divisão das Tarefas do Projeto
- **Modelagem do Banco de Dados:** Mateus Rosetti  
- **Desenvolvimento das Rotas:** Mateus Rosetti  
- **Autenticação JWT:** Mateus Rosetti  
- **Testes Automatizados:** Mateus Rosetti  
- **Documentação Swagger:** Mateus Rosetti  
- **README e Organização do Repositório:** Mateus Rosetti  



##  Descrição Geral do Projeto
Foi desenvolvida uma **API completa de gerenciamento de tarefas** utilizando:

- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT (JSON Web Token)  
- CRUD completo de tarefas  
- Testes com Jest e Supertest  
- Documentação Swagger (OpenAPI 3.0)  
- Boas práticas REST  
- Validações e regras de negócio


##  Tecnologias Utilizadas
- **Node.js**
- **Express**
- **MongoDB / Mongoose**
- **JWT – JSON Web Token**
- **Bcrypt.js**
- **Nodemon**
- **Swagger (OpenAPI)**
- **Jest + Supertest**
- **Postman / Thunder Client**



## Estrutura do Projeto

/src
/controllers
authController.js
tarefasController.js
/models
userModel.js
tarefasModel.js
/routes
authRouter.js
tarefasRouter.js
/middlewares
authMiddleware.js

swagger.yaml
app.js
server.js
package.json
README.md



#  Como Executar o Projeto

## 1 Clonar o repositório

git clone https://github.com/MateusRosetti/trabalho-backend.git
cd trabalho-backend
npm install

Criar o arquivo .env (OBRIGATÓRIO)

PORT=3000
MONGO_URL=mongodb://localhost:27017/trabalho_final
JWT_SECRET=senha12345
JWT_EXPIRES_IN=5d

Há também um arquivo .env.example com o modelo de referência.

3 Rodar o servidor
npm run dev

O servidor iniciará em:

http://localhost:3000

Autenticação (JWT)

As rotas de escrita (POST, PUT, DELETE) são protegidas por JWT.

Para gerar token, use a rota:

 Login:
POST /api/v1/auth/login
{
  "email": "seuemail@example.com",
  "senha": "suasenha"
}

O token deve ser enviado no header:

Authorization: Bearer seu_token_aqui


Principais Endpoints
Criar tarefa (protegido)
POST /api/v1/tarefas

Listar todas as tarefas
GET /api/v1/tarefas

Buscar tarefa por ID
GET /api/v1/tarefas/:id

Atualizar tarefa (protegido)
PUT /api/v1/tarefas/:id

Deletar tarefa (protegido)
DELETE /api/v1/tarefas/:id



