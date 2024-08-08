import { Options } from "sequelize";

export const sequelizeConfig: Options = {
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_NAME,
    host: process.env.MYSQLDB_HOST,
    dialect: 'mysql',
  }