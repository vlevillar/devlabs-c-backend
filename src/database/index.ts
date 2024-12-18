import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo_database", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

export default sequelize;
