import { Sequelize } from "sequelize";
import db from "../Config/database.js";

const Tutor = db.define("tbl_tutor", {
  cpf: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
},
  {
    timestamps: false, //Evita o registro de data/horario nas tabelas do banco
    freezeTableName: true, //Evita a pluralização dos nomes
  }
)


export default Tutor