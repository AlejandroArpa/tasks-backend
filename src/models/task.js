import { DataTypes } from 'sequelize';

export const taskModelDef = {
  name: 'Tasks',
  definition: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed',  'expired', 'canceled'), // ajusta según los valores de tu enum task_status
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'), // ajusta según los valores de tu enum task_priority
      allowNull: false,
    },
    expiration_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  },
  options: {
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};
