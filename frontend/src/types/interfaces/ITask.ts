import { ICategory } from "./ICategory"

export interface ITask {
    id: string;
    title: string;
    description: string;
    category?: ICategory;
    recurrent: boolean;
    startDateTime: string | Date;
    endDateTime: string | Date;
    completed: boolean;
}