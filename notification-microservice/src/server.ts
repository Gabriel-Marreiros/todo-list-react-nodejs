import * as dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import { taskNotificationConsumer } from './jobs/taskNotificationConsumer';
import { welcomeNotificationConsumer } from './jobs/welcomeNotificationConsumer';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware';
import { metricsMiddleware } from './configs/metrics-middleware';
dotenv.config(); 

const app = express();

app.use(cors());
app.use(json());
app.use(metricsMiddleware);

app.use(errorHandlerMiddleware.handle());

const serverPort: number = 8081;
app.listen(serverPort, () => {
    console.log("Servidor de notificação rodando na porta:", serverPort);

    taskNotificationConsumer.start();
    welcomeNotificationConsumer.start();
});
