
import {getAltura, createAltura, updateAltura, deleteAltura}  from "../Controller/altura_controller.js";
import express from "express"
import { verifyJWT } from "../Controller/usuario_controller.js";

const routerAltura = express.Router()

routerAltura.get("/altura",verifyJWT, getAltura)
routerAltura.post("/altura",verifyJWT, createAltura)
routerAltura.put("/altura/:cod",verifyJWT, updateAltura)
routerAltura.delete("/altura/:cod",verifyJWT, deleteAltura)

export default routerAltura