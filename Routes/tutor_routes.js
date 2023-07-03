import express from "express"
import { getTutor, getTutorById, createTutor, updateTutor, deleteTutor } from "../Controller/tutor_controller.js"
import { verifyJWT } from "../Controller/usuario_controller.js"

const routerTutor = express.Router()

routerTutor.get("/tutor",verifyJWT,getTutor)
routerTutor.get("/tutor/:cpf",verifyJWT, getTutorById)
routerTutor.post("/tutor", verifyJWT, createTutor)
routerTutor.put("/tutor/:cpf",verifyJWT, updateTutor)
routerTutor.delete("/tutor/:cpf",verifyJWT, deleteTutor)

export default routerTutor