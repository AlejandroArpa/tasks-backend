import { DataTypes } from 'sequelize';

export const userModelDef = {
  name: 'Users',
  definition: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  },
  options: {
    tableName: 'users',
    timestamps: true,
  }
};
