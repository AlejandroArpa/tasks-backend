import { DataTypes } from 'sequelize';

export const tasksTagsModelDef = {
  name: 'TasksTags',
  definition: {
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tasks',
        key: 'id',
      },
      primaryKey: true,
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tags',
        key: 'id',
      },
      primaryKey: true,
    },
  },
  options: {
    tableName: 'tasks_tags',
    timestamps: false,
  },
};
