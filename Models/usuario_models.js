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