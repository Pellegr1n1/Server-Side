import { Sequelize } from "sequelize";
import db from "../Config/database.js";
import Altura from "./altura_models.js";
import Tutor from "./tutor_models.js";

const Pet = db.define(
  "tbl_pet",
  {
    codigo_pet: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nome: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    genero: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    altura: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    cpf: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Tutor,
        key: "cpf",
      },
    },
    codigo_altura: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: Altura,
        key: "codigo_altura",
      },
    }
  },
  {
    timestamps: false, //Evita o registro de data/horario nas tabelas do banco
    freezeTableName: true, //Evita a pluralização dos nomes
  }
);

Pet.belongsTo(Tutor, { foreignKey: "cpf" }) //Relacionamento

Pet.belongsTo(Altura, { foreignKey: 'codigo_altura', as: 'Altura' })


export default Pet;
