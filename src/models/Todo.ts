import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../database";

interface TodoAttributes {
  id: number;
  title: string;
  userId: string;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, "id"> {}

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  public id!: number;
  public title!: string;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "todo",
    tableName: "todos",
    timestamps: true,
  }
);

export default Todo;
