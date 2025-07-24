import { tasksTagsModelDef }  from "../models/tasksTags.js";
import { CategoryModelDef }   from "../models/category.js";
import { taskModelDef }       from "../models/task.js";
import { userModelDef }       from "../models/user.js";
import { tagModelDef }        from "../models/tag.js";
import { Sequelize }          from "sequelize";
import { config }             from "dotenv";


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

export const Categories = sequelize.define(
  CategoryModelDef.name,
  CategoryModelDef.definition,
  CategoryModelDef.options
);

export const Tags = sequelize.define(
  tagModelDef.name,
  tagModelDef.definition,
  tagModelDef.options
);

export const TasksTags = sequelize.define(
  tasksTagsModelDef.name,
  tasksTagsModelDef.definition,
  tasksTagsModelDef.options
);

Tasks.belongsToMany(Tags, {
  through: TasksTags,
  foreignKey: "task_id",
  otherKey: "tag_id"
});

Tags.belongsToMany(Tasks, {
  through: TasksTags,
  foreignKey: "tag_id",
  otherKey: "task_id"
});