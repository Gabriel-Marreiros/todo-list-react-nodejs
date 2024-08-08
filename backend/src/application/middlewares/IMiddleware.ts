import { Handler } from "express";

export interface IMiddleware {
    handle(): Handler;
}