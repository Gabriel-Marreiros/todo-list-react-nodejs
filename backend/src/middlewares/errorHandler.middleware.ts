import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ICustomError } from "../errors/ICustomError";

class ErrorHandlerMiddleware {

    constructor() { }

    public handle(): ErrorRequestHandler {
        return async (error: ICustomError, request: Request, response: Response, next: NextFunction): Promise<void> => {
            console.log(error);

            error.instance = request.url;
            error.status ??= 500;

            response.status(error.status).json(error);
        }
    };
};

export const errorHandlerMiddleware = new ErrorHandlerMiddleware();