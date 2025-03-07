import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { json } from 'express';
import { MongoDBConnection } from './database/mongodb/mongoDbConnection';
import { authenticationRouter } from './routes/authentication.routes';
import { categoryRouter } from './routes/category.routes';
import { taskRouter } from './routes/task.routes';
import { userRouter } from './routes/user.routes';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware';
import { tokenJwtAuthenticationMiddleware } from './middlewares/tokenJwtAuthentication.middleware';
import { metricsMiddleware } from './configs/metrics-middleware';
import {mongoDbConfig} from './configs/mongodb';
dotenv.config(); 

const mongoDBConnection: MongoDBConnection = new MongoDBConnection(
    mongoDbConfig.mongodbHost,
    mongoDbConfig.mongodbPort,
    mongoDbConfig.mongodbUser,
    mongoDbConfig.mongodbPassword,
    mongoDbConfig.mongodbDatabase
);

const app = express();

app.use(cors());
app.use(json());
app.use(metricsMiddleware);

app.use(["/categories", "/users", "/tasks"], tokenJwtAuthenticationMiddleware.handle());

app.use(authenticationRouter);
app.use(taskRouter);
app.use(categoryRouter);
app.use(userRouter);

app.use(errorHandlerMiddleware.handle());

const serverPort: number = 8080;
app.listen(serverPort, () => {
    console.log("Servidor Todo List React Node.js rodando na porta:", serverPort);

    mongoDBConnection.connect();
});
