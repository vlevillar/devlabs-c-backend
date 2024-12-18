import { Sequelize } from "sequelize";

const sequelize = new Sequelize("postgresql://challenge_devlabs_user:TbYqBpqmTKnes0Wbhf5zCjfXhmy0zE58@dpg-cthfa79u0jms7384dbmg-a.oregon-postgres.render.com/challenge_devlabs", {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl:{
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize;
