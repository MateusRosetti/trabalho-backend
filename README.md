# trabalho-backend 

* integgrantes do grupo :
-Mateus Rosetti Da Rocha Ribeiro (2314290085)

* Divisão de Tarefas

Modelagem do banco:Mateus Rosetti
Desenvolvimento das rotas:Mateus Rosetti
Autenticação JWT:Mateus Rosetti
Testes:Mateus Rosetti
Swagger:Mateus Rosetti
README e organização do repositório:Mateus Rosetti

* uma API completa de gerenciamento de tarefas,foi utilizado o node.js,express,mongoDB e JWT . foi colocado tambem CRUD completo,testes,documentaçao swagger e boas praticas REST.

* Tecnologias Utilizadas:

Node.js
Express
MongoDB + Mongoose
JWT (JSON Web Token)
Nodemon
Swagger (OpenAPI 3.0)
Postman / REST Client
Bcrypt

* A estrutura do projeto foi basicamente dividida assim: 
/src
  /controllers
    tarefasController.js
    authController.js
  /models
    tarefaModel.js
    usuarioModel.js
  /routes
    tarefasRouter.js
    authRouter.js
  /middlewares
    authMiddleware.js
swagger.yaml
server.js
package.json
README.md

* para ser feito a instalacao e execucao do projeto precisa ser feito esse passo a passo :

  1:clonar o repositorio
  git clone https://github.com/MateusRosetti/trabalho-backend.git
  cd trabalho-backend-trabalho-final
  npm install

  e um .env com o seguinte codigo :

MONGO_URI=mongodb://localhost:27017/todo
JWT_SECRET=segredo123
PORT=3000

e rodar o servidor (npm run dev)


* foi feito tambem o processo de autenticacao para acassar rotas de escrita (POST,PUT,DELETE). o token é gerado pela rota POST /api/v1/auth/login

* a documentacao da api esta no arquivo swager que esta no arquivo chamado swagger.yaml

* Endpoints Principais
 
 Criar tarefa:

POST /api/v1/tarefas

 Listar todas:

GET /api/v1/tarefas

 Buscar por ID:

GET /api/v1/tarefas/{id}

 Atualizar:

PUT /api/v1/tarefas/{id}

 Excluir:

DELETE /api/v1/tarefas/{id}



