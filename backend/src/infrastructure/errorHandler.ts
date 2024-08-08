import { NextFunction, Request, Response } from "express";
import { IBaseError } from "../domain/errors/IBaseError";

export async function errorHandler(error: IBaseError, request: Request, response: Response, next: NextFunction): Promise<void> {
    console.log(error);
    
    error.instance = request.url;

    response.status(error.status).json(error).send();
}