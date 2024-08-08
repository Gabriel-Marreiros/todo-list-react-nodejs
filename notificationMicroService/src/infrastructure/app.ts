import cors from 'cors';
import express from 'express';
import { errorHandler } from './errorHandler';
import { emailNotificationRouter } from './routes/emailNotification.routes';

export class App {

    private app = express();

    constructor() {
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorsHandler();
    }

    private initMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }
    
    private initRoutes(): void {
        this.app.use("/email-notification", emailNotificationRouter);
    };

    private initErrorsHandler(): void {
        this.app.use(errorHandler);
    }

    public start(port: number, callback?: () => void): void {
        this.app.listen(port, callback)
    }
}