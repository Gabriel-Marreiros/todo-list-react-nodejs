import { Category, ICategoryModel } from "./category.entity";

interface ITaskModel {
    _id: string;
    title: string;
    description: string;
    category: ICategoryModel | null;
    recurrent: boolean;
    startDateTime: Date;
    endDateTime: Date;
    completed: boolean;
}

export class Task {
    public id: string;
    public title: string;
    public description: string;
    public category: Category | null;
    public recurrent: boolean;
    public startDateTime: Date;
    public endDateTime: Date;
    public completed: boolean;

    private constructor(
        taskModel: ITaskModel
    ){
        this.id = taskModel._id;
        this.title = taskModel.title;
        this.description = taskModel.description;
        this.category = taskModel.category ? Category.with(taskModel.category) : null;
        this.recurrent = taskModel.recurrent;
        this.startDateTime = taskModel.startDateTime;
        this.endDateTime = taskModel.endDateTime;
        this.completed = taskModel.completed;
    }

    public static with(taskModel: ITaskModel): Task {
        return new Task(taskModel);
    }
}