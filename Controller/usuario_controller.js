import Cliente from "../Models/usuario_models.js"
import jwt from "jsonwebtoken"
import { config } from 'dotenv-safe'

config({ path: '.env.example' })

const getClienteByUser = async (req, res) => {
  try {
    const userId = req.userId

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
        msg: "Usuário existente!"
      })
    } else {
      const user = await Cliente.create(req.body)
      const token = jwt.sign({ usuario }, process.env.SECRET, {
        expiresIn: 900
      })
      return res.status(200).json({
        user,
        auth: true,
        token,
        msg: "Usuário criado com sucesso!"
      })
    }
  } catch (e) {
    console.log("Erro: ", e)
    return res.status(500).json({
      msg: "Ocorreu um erro ao criar o usuário"
    })
  }
}

const loginCliente = async (req, res) => {
  try {
    const { usuario, senha } = req.body
    const usuarioVerify = await Cliente.findByPk(usuario)

    if (!usuarioVerify) {
      return res.status(404).json({
        msg: "Usuário incorreto"
      })
    }

    if (usuarioVerify.senha !== senha) {
      return res.status(404).json({
        msg: "Senha incorreta"
      })
    }

    const token = jwt.sign({ usuario }, process.env.SECRET, {
      expiresIn: 300
    })

    return res.status(200).json({
      auth: true,
      token,
      msg: "Usuário logado com sucesso"
    })
  } catch (e) {
    console.log("Erro: ", e)
    return res.status(500).json({
      msg: "Ocorreu um erro ao realizar o login"
    })
  }
}

const deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.user)

    const userId = req.userId

    if (req.params.user !== userId) {
      return res.status(403).json({
        msg: "Acesso não autorizado"
      })
    }

    if (!cliente) {
      return res.status(404).json({
        msg: 'O usuário não foi encontrado'
      })
    }

    await cliente.destroy()

    return res.status(200).json({
      msg: `Usuário ${cliente.usuario} excluído com sucesso!`
    })
  } catch (error) {
    console.log('Erro:', error);
    return res.status(500).json({
      msg: 'Ocorreu um erro ao excluir o usuário'
    })
  }
}

export { getClienteByUser, loginCliente, createUsuario, verifyJWT, deleteCliente }
