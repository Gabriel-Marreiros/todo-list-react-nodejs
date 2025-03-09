import { ICustomError } from "../ICustomError";

export class IncorrectUserOrPasswordError extends Error implements ICustomError {
    public title: string;
    public status: number;
    public instance: string = "";

    constructor(
        title: string,
        message: string,
        status: number
    ){
        super();
        this.title = title;
        this.message = message;
        this.status = status;
    }
}