import { Sequelize } from "sequelize";

const db = new Sequelize('Pet', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})
export default db