import { Document, UpdateWriteOpResult } from "mongoose";
import { ICreateTaskRequestDTO } from "../../../application/dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../../../application/dto/task/ITaskUpdateRequestDTO";

export interface ITaskRepository {
    deleteTask(taskId: string): Promise<Document | null>;
    
    getAllUserTasks(userId: string): Promise<Document[]>;
    
    getTaskById(taskId: string): Promise<Document | null>;

    saveTask(task: ICreateTaskRequestDTO): Promise<Document>;

    getCompletedTasks(userId: string): Promise<Document[]>;

    getTodaysTask(userId: string): Promise<Document[]>;

    getNextTasks(userId: string): Promise<Document[]>;

    completeTaskById(taskId: string): Promise<UpdateWriteOpResult>;

    completeManyTasksById(tasksId: string[]): Promise<UpdateWriteOpResult>;

    updateTask(taskId: string, taskUpdate: ITaskUpdateRequestDTO): Promise<Document | null>;
}