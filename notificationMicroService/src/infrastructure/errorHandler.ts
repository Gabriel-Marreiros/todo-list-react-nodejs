import { NextFunction, Request, Response } from "express";

export async function errorHandler(error: any, request: Request, response: Response, next: NextFunction): Promise<void> {
    console.log(error);

    response.status(400).json(error).send();
}