import express from "express"
import {getPet,getPetById, createPet, updatePet, deletePet } from "../Controller/pet_contoller.js"
import { verifyJWT } from "../Controller/usuario_controller.js"


const routerPet = express.Router()
routerPet.get("/pet",verifyJWT, getPet)
routerPet.get("/pet/:cod", verifyJWT, getPetById)
routerPet.post("/pet",verifyJWT, createPet)
routerPet.put("/pet/:cod",verifyJWT, updatePet)
routerPet.delete("/pet/:cod",verifyJWT, deletePet)


export default routerPet