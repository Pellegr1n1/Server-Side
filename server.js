import express from 'express'
import routerTutor from './Routes/tutor_routes.js'
import routerPet from './Routes/pet_routes.js'
import routerUsuario from './Routes/usuario_routes.js'
import db from './Config/database.js'


const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(routerUsuario)
server.use(routerPet)
server.use(routerTutor)
db.sync({ alter: true }).then(() => {
	console.log("Tabelas criadas no banco de dados")
}).catch(error => {
	console.error("Erro ao sincronizar os modelos com o banco de dados:", error)
});
server.listen(3000, function () {
	console.log('Sevidor rodando na porta 3000')
});
