import { taskModelDef } from "../models/task.js";
import { userModelDef } from "../models/user.js";
import { Sequelize }    from "sequelize";
import { config }       from "dotenv";


config();
const { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD, DB_PORT } = process.env;

export const sequelize = new Sequelize({
    dialect: 'postgresql',
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    define: {
        underscored: true
    }
});

export const Users = sequelize.define(
  userModelDef.name,
  userModelDef.definition,
  userModelDef.options
);

export const Tasks = sequelize.define(
  taskModelDef.name,
  taskModelDef.definition,
  taskModelDef.options
);
