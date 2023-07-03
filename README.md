# Aplicação Server-Side 🖥

Neste documento, apresentaremos uma aplicação server-side no padrão MVC (Model-View-Controller) que utiliza tokens web para a segurança dos endpoints. O objetivo deste trabalho é adquirir conhecimento sobre APIs e aprimorar as linguagens e tecnologias utilizadas no desenvolvimento.

## Tecnologias Utilizadas 🤖
<div style="display: inline_block"><br/>

- <img align="center" alt="Node.js" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
</b>

- <img align="center" alt="Sequelize" src="https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue"/>
</b>

- <img align="center" alt="Json Web Token" src="https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink"/> 
</b>

- <img align="center" alt="Express.js" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/>
</b>

- <img align="center" alt="Express.js" src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white"/>
</b>


## Download 🚀

Antes de dar inicio a nossa API precisamos baixar o Node.js.

https://nodejs.org/en

## Pré-Requisitos 📋

Agora que você tem o Node.js instalado, vamos criar quatro pastas importantes para a estrutura da nossa aplicação. Essas pastas são: **"Config"**, **"Controller"**, **"Models"** e **"Routes"**. 


## Inicio 👻

Após configurar seu projeto, precisamos instalar as bibliotecas/frameworks que serão utilizadas no desenvolvimento da nossa API. No terminal do Visual Studio Code, insira o comando abaixo:

````
npm install sequelize mysql2 jsonwebtoken express dotenv-safe body-parser --save
````
Verifique no arquivo "package.json" se todos foram instalados com sucesso. Além disso, como iremos trabalhar com modulos adicione o "type": "module". Segue a imagem de exemplo.


![image](https://github.com/Pellegr1n1/Server-Side/assets/119978954/de619a50-4315-4e4a-a621-7e2143707774)



## Config ⚙️

Na pasta "Config", você pode criar arquivos .js para armazenar configurações e informações relacionadas à sua aplicação. Iremos utilizar um arquivo .js para armazenar a configurações de banco de dados. 

````
import { Sequelize } from "sequelize"

const db = new Sequelize('(DataBase)', '(User)', '(Password)', {
    host: 'localhost',
    dialect: 'mysql'
})
export default db
````
- Neste exemplo, estou estabelecendo a conexão com o banco de dados MySQL utilizando o Sequelize. Na função Sequelize passo três argumentos: (DataBase), (User) e (Password). Esses argumentos representam as informações necessárias para a conexão com o banco de dados MySQL.

**Lembre-se de criar um banco de dados com o mesmo nome informado no código. Não é necessário criar as tabelas por meio de SQL, pois iremos utilizar um método do Sequelize para isso.**

## Conexão com o servidor 🌐

Agora você pode criar um arquivo chamado "server.js" para implementar a conexão com a porta e as rotas em sua aplicação. O arquivo "server.js" servirá como ponto de entrada para o seu servidor. 

````
import express from 'express'
import db from './Config/database.js'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Sincroniza os modelos com o banco de dados
db.sync({ alter: true }).then(() => {
	console.log("Tabelas criadas no banco de dados")
}).catch(error => {
	console.error("Erro ao sincronizar os modelos com o banco de dados:", error)
});
server.listen(3000, function () {
	console.log('Sevidor rodando na porta 3000')
});
````
- Note que neste código, estou implementando a conexão com a porta 3000. Além disso, utilizo a função "sync" do Sequelize para criar ou alterar as tabelas de acordo com os modelos definido na pasta [Models](https://github.com/Pellegr1n1/Server-Side#models-).
  
**Obs.: Para o método "sync" funcionar, você precisa ter criado todos os modelos necessários para a sua aplicação.**

## Models 🎲
Na pasta "Models", você pode criar arquivos .js para definir os modelos da sua aplicação. Esses arquivos serão responsáveis por descrever a estrutura das tabelas do banco de dados e definir as relações entre elas. 

- No exemplo a seguir, estou importando o módulo "db" da pasta "Config", que representa o banco de dados, e o módulo "Sequelize" para facilitar a criação e definição dos modelos do banco de dados. Utilizo o método **"define"** do Sequelize para criar a tabela, juntamente com seus respectivos campos.
````
import { Sequelize } from "sequelize";
import db from "../Config/database.js";

const Cliente = db.define("tbl_usuario", {
    usuario: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING(20),
        allowNull: false
    }
},
    {
        timestamps: false, //Evita o registro de data/horario nas tabelas do banco
        freezeTableName: true, //Evita a pluralização dos nomes
    }
)

export default Cliente
````
Caso você precise estabelecer relacionamentos entre tabelas usando chaves estrangeiras, uma abordagem comum é utilizar a função belongsTo para definir o relacionamento no seu código. 

- Lembre-se de criar mais um campo na sua tabela e adicionar a referencia para estabelecer o relacionamento.
````
(nome_do_campo): {
  type: Sequelize.INTEGER,
  allowNull: false,
  references: {
    model: (nome_do_modelo),
    key: "(nome_da_chave)",
  },
},
````

Ao utilizar o **belongsTo**, você pode especificar o modelo relacionado e a chave estrangeira correspondente. Dessa forma, o Sequelize entenderá a associação entre os modelos e permitirá que você acesse os registros relacionados.

````
Pet.belongsTo(Tutor, { foreignKey: "cpf" })
````

Nesse exemplo indica que um "Pet" pertence a um "Tutor" e a chave estrangeira utilizada para essa associação é a coluna "cpf" da tabela "Tutor"


## Controller 🎮

Na pasta "Controller", crie um arquivo .js para implementar o controle das funcionalidades da aplicação. Este arquivo será responsável por receber as requisições dos clientes e coordenar as ações necessárias.

### Tokens 🔒

Lembre-se de que estamos utilizando tokens de autenticação baseados em web tokens (JWT) para a nossa aplicação. Para implementar essa funcionalidade, você pode seguir o exemplo abaixo:

- Observe que, ao utilizar o Sequelize para a criação das tabelas, você pode aproveitar as funções fornecidas por essa biblioteca, como: **"create"**, **"findAll"**, **"destroy"**, **"update"** dentre outras.
- Não se esqueça de criar uma variavel ambiente com um **SECRET** a seu critério. Estou utilizando ".env.example" como nome do arquivo.

No exemplo abaixo, estou enviando o token logo após a criação de um usuário.
````
import Cliente from "../Models/usuario_models.js"
import jwt from "jsonwebtoken"
import { config } from 'dotenv-safe'

config({ path: '.env.example' })

const createUsuario = async (req, res) => {
    try {
        const { usuario, senha } = req.body
        if (!usuario || !senha) {
            return res.status(422).json({
                msg: "Todos os campos devem estar preenchidos!"
            })
        }
        const valida = await Cliente.findByPk(usuario)

        if (valida) {
            return res.status(409).json({
                msg: "Usuario existente!"
            })
        } else {
            const user = await Cliente.create(req.body)
            const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: 300
            })
            return res.status(200).json({
                user,
                auth: true,
                token,
                msg: "Usuario criado com sucesso!"
            })
        }
    } catch (e) {
        console.log("Error : ", e)
        return res.status(500).json({
            msg: "Ocorreu um erro ao criar o usuario"
        })
    }
}
````
Note que estou utilizando as bibliotecas:

- "Cliente" que é responsável pelo cadastro de usuários;
- "jsonwebtoken" que é usada para trabalhar com JSON Web Tokens (JWT)
- "dotenv-safe" que é utilizada para carregar variáveis de ambiente de forma segura a partir de um arquivo .env.
  
Neste código, estou criando um usuário e realizando as devidas validações. Se todas as validações forem aprovadas, gero um token de autenticação utilizando o método "sign" do JSON Web Token. Esse método requer um payload, que neste caso é o usuário, e um segredo (secret) para aumentar a segurança do token.

Após gerar o token, é necessário validar o mesmo para aumentar a segurança. 

````
function verifyJWT(req, res, next) {
  const token = req.headers['x-access-token']
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        msg: "Token inválido"
      })
    }
    req.userId = decoded.usuario
    next()
  })
}
````
Neste exemplo de código, estou definindo a função verifyJWT como um middleware para verificar a validade do meu token de acesso. Além disso, decodifico o token para obter informações do usuário autenticado, permitindo o prosseguimento da requisição apenas se o token for válido.

- Middleware: Um middleware é uma função que é executada no meio do processamento de uma requisição HTTP, permitindo realizar ações antes ou depois de uma determinada rota ou função ser executada.

Agora precisamos implementar um método que, ao acessar o endpoint passando o usuário como parâmetro, ele busca os dados desse usuário apenas se o token for válido para o mesmo. 

````
const getClienteByUser = async (req, res) => {
  try {
    const userId = req.userId

    // Verifica se o token gerado é do usuario que esta tentando acessar
    if (req.params.user !== userId) {
      return res.status(403).json({
        msg: "Acesso não autorizado"
      })
    }

    const getUser = await Cliente.findByPk(req.params.user)
    
    if (!getUser) {
      return res.status(404).json({
        msg: 'O usuário não foi encontrado'
      })
    }

    return res.status(200).json({
      getUser
    })
  } catch (e) {
    console.log("Erro: ", e)
    return res.status(500).json({
      msg: "Ocorreu um erro ao acessar os usuários"
    })
  }
}
````

- Note que na minha função "verifyJWT", eu decodifico o usuário e passo-o para a variável "userId". Neste trecho de código, para verificar se o token pertence ao usuário, eu adiciono uma condição em que, se o parâmetro passado na URL for diferente de "userId", o acesso não é autorizado. Caso contrário, o restante do código é executado.

## Routes ✈️
 
Na pasta "Routes", você pode criar arquivos .js para definir as rotas da sua aplicação. Esses arquivos serão responsáveis por receber as requisições HTTP e direcioná-las para as funções adequadas nos controladores. Nas rotas privadas inclua a função **"verifyJWT"** que implementamos no controller.

- Lembre-se de chamar as rotas no arquivo "server.js".

````
import express from "express";
import { createUsuario, deleteCliente, getClienteByUser, loginCliente, verifyJWT } from "../Controller/usuario_controller.js";

const routerUsuario = express.Router()

routerUsuario.get("/usuario/:user",verifyJWT, getClienteByUser)
routerUsuario.post("/usuario/register", createUsuario)
routerUsuario.post("/usuario/login", loginCliente)
routerUsuario.delete("/usuario/:user", verifyJWT, deleteCliente)

export default routerUsuario
````
Note que estou utilizando as bibliotecas:

- "express" que é um framework utilizado para desenvolvimento de aplicações web em Node.js.
- "usuario_controller"  que contém os métodos criados para controlar as funcionalidades relacionadas aos usuários.

Neste exemplo, utilizo o "express" para a criação das minhas rotas. Elas são configuradas usando o objeto "routerUsuario" e exportadas para serem utilizadas no arquivo "server.js" criado anteriormente.

### Implementando rotas no "server.js"

Para implementar suas rotas no servidor, você precisa importá-las e utilizar o método "use" do Express para defini-las. 

Segue o exemplo:

````
import express from 'express'
import routerTutor from './Routes/tutor_routes.js'
import routerPet from './Routes/pet_routes.js'
import routerUsuario from './Routes/usuario_routes.js'
import db from './Config/database.js'

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

//Rotas
server.use(routerUsuario)
server.use(routerPet)
server.use(routerTutor)

db.sync({ alter: true }).then(() => {
	console.log("Tabelas criadas no banco de dados")
}).catch(error => {
	console.error("Erro ao sincronizar os modelos com o banco de dados:", error)
})
server.listen(3000, function () {
	console.log('Sevidor rodando na porta 3000')
})
````

## Conclusão 🎯

Neste projeto, desenvolvemos uma aplicação server-side no padrão MVC, utilizando tecnologias como Node.js, Sequelize, Json Web Token e Express.js. Aprendemos a configurar o ambiente de desenvolvimento, criar modelos de banco de dados, implementar funcionalidades nos controladores e proteger os endpoints com tokens de autenticação. Essas habilidades adquiridas são essenciais para construir APIs seguras e escaláveis, demonstrando a importância de estruturar corretamente uma aplicação back-end.

### Desenvolvedores 👨‍💻

Créditos ao Leandro Pellegrini Fodi e Vítor de Oliveira Celestino da Silva





