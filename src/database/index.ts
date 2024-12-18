import { Sequelize } from "sequelize";

const sequelize = new Sequelize("todo_database", "challenge_devlabs_user", "TbYqBpqmTKnes0Wbhf5zCjfXhmy0zE58", {
  host: "dpg-cthfa79u0jms7384dbmg-a",
  dialect: "postgres",
  logging: false,
});

export default sequelize;
