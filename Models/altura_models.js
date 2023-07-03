import { Sequelize } from "sequelize";
import db from "../Config/database.js";

const Altura = db.define("tbl_altura", {
    codigo_altura: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING(25),
        allowNull: false
    }
},
    {
        timestamps: false, //Evita o registro de data/horario nas tabelas do banco
        freezeTableName: true, //Evita a pluralização dos nomes
    }
)

export default Altura