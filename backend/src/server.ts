import mongoose from "mongoose";
import { App } from "./infrastructure/app";
import { MongoDBConnection } from "./infrastructure/database/mongodb/mongoDbConnection";
import * as dotenv from 'dotenv';

dotenv.config();

const app: App = new App();

const mongodbHost: string = process.env.MONGODB_HOST!;
const mongodbUser: string = process.env.MONGODB_USER!;
const mongodbPassword: string = process.env.MONGODB_PASSWORD!;
const mongodbDatabase: string = process.env.MONGODB_DATABASE!;

const mongoDBConnection: MongoDBConnection = new MongoDBConnection(
    mongodbHost,
    mongodbUser,
    mongodbPassword,
    mongodbDatabase
);

mongoDBConnection.connect()

app.start(8080, () => {
    console.log("servidor funcionando");
})
