import mongoose from "mongoose";
import { IDatabaseConnection } from "../IDatabaseConnection";

export class MongoDBConnection implements IDatabaseConnection {

    private host: string;
    private user: string;
    private password: string;
    private database: string;

    constructor(
        host: string,
        user: string,
        password: string,
        database: string,
    ) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.database = database;
    }

    public async connect(): Promise<any> {
        const stringConnection: string = `mongodb://${this.user}:${this.password}@${this.host}/${this.database}?authSource=admin`;

        return mongoose.connect(stringConnection, {
            autoCreate: true,
        })
        .then(() => {
            console.log("Conexão com banco de dados concluída com sucesso.")
        })
        .catch((error) => {
            console.log("Erro ao conectar com o banco de dados");
            console.log(error);
            throw error;
        });
    }

}
