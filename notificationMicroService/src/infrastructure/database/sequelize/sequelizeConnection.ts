import { Sequelize } from "sequelize";
import { IDatabaseConnection } from "../IDatabaseConnection";
import { sequelizeConfig } from "./sequelizeConfig";

export class SequelizeConnection implements IDatabaseConnection {

    public sequelize = new Sequelize(sequelizeConfig);

    constructor() {}

    public async connect(): Promise<any> {
        return this.sequelize.authenticate().then(() => {
            console.log("conexão concluída com sucesso")
        })
        .catch((error) => {
            console.log("A conexão falhou");
            console.log(error);
        });
    }

}
