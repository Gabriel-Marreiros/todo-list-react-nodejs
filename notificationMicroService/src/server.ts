import * as dotenv from 'dotenv';
import { App } from "./infrastructure/app";
import { SequelizeConnection } from './infrastructure/database/sequelize/sequelizeConnection';

dotenv.config();

const app: App = new App();

const sequelizeConnection = new SequelizeConnection();

sequelizeConnection.connect();

app.start(8081, () => {
    console.log("servidor funcionando");
})
