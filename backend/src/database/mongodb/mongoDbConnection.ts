import mongoose from "mongoose";

export class MongoDBConnection {

    private host: string;
    private port: string;
    private user: string;
    private password: string;
    private database: string;

    constructor(
        host: string,
        port: string,
        user: string,
        password: string,
        database: string,
    ) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
    }

    public async connect(): Promise<any> {
        const stringConnection: string = `mongodb://${this.user}:${this.password}@${this.host}:${this.port}/${this.database}`;

        try {
            await mongoose.connect(stringConnection, {
                autoCreate: true,
                authSource: "admin"
            })    
            
            console.log("Conexão com banco de dados concluída com sucesso.")
        } 
        catch (error) {
            console.log("Erro ao conectar com o banco de dados");
            console.log(error);
            throw error;
        };
    }

}
