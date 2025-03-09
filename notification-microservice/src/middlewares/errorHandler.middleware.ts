import { ErrorRequestHandler, Handler, NextFunction, Request, Response } from "express";

class ErrorHandlerMiddleware {

    constructor(){}

    public handle(): ErrorRequestHandler {
        return async (error: any, request: Request, response: Response, next: NextFunction): Promise<void> => {
        console.log(error);
    
        response.status(400).json(error).send();
    }};
};

export const errorHandlerMiddleware = new ErrorHandlerMiddleware();