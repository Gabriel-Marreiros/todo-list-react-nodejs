import { IBaseError } from "../IBaseError";

export class NoTokenJwtError extends Error implements IBaseError {
    public title: string;
    public message: string;
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