import { Task } from "../../../domain/entities/task.entity";
import { ICreateTaskRequestDTO } from "../../dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../../dto/task/ITaskUpdateRequestDTO";


export interface ITaskService {
    updateTask(taskId: string, taskUpdate: ITaskUpdateRequestDTO): Promise<Task>;

    deleteTask(taskId: string): Promise<Task>;

    getAllUserTasks(userId: string): Promise<Task[]>;

    getTaskById(taskId: string): Promise<Task>;

    saveTask(task: ICreateTaskRequestDTO): Promise<Task>;

    getNextTasks(userId: string): Promise<Task[]>;

    getTodaysTask(userId: string): Promise<Task[]>;
    
    getCompletedTasks(userId: string): Promise<Task[]>;
    
    completeTaskById(taskId: string): Promise<any>;

    completeManyTasksById(tasksId: string[]): Promise<any>;
}