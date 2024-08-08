import cors from 'cors';
import express from 'express';
import { tokenJwtAuthenticationMiddleware } from '../application/middlewares/tokenJwtAuthentication.middleware';
import { errorHandler } from './errorHandler';
import { authenticationRouter } from './routes/authentication.routes';
import { categoryRouter } from './routes/category.routes';
import { taskRouter } from './routes/task.routes';
import { userRouter } from './routes/user.routes';

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

        this.app.use(["/categories", "/users", "/tasks"], tokenJwtAuthenticationMiddleware.handle());
    }
    
    private initRoutes(): void {
        this.app.use("/auth", authenticationRouter);
        this.app.use("/tasks", taskRouter);
        this.app.use("/categories", categoryRouter);
        this.app.use("/users", userRouter);
    };

    private initErrorsHandler(): void {
        this.app.use(errorHandler);
    }

    public start(port: number, callback?: () => void): void {
        this.app.listen(port, callback)
    }
}