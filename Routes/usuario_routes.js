import express from "express";
import { createUsuario, deleteCliente, getClienteByUser, loginCliente, verifyJWT } from "../Controller/usuario_controller.js";

const routerUsuario = express.Router()

routerUsuario.get("/usuario/:user",verifyJWT, getClienteByUser)
routerUsuario.post("/usuario/register", createUsuario)
routerUsuario.post("/usuario/login", loginCliente)
routerUsuario.delete("/usuario/:user", verifyJWT, deleteCliente)

export default routerUsuario