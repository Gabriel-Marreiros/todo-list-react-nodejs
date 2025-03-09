import { IPage } from '../../interfaces/IPage';
import { Document, UpdateWriteOpResult } from "mongoose";
import { ICreateTaskRequestDTO } from "../../dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../../dto/task/ITaskUpdateRequestDTO";
import { ITasksPagination } from "../../interfaces/ITasksPagination";
import { ITasksSummaryDTO } from '../../dto/task/ITasksSummaryDTO';

export interface ITaskRepository {
    getLateTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Document[]>>;

    getTasksSummary(userId: string): Promise<ITasksSummaryDTO>

    getTasksByDate(userId: string, date: string): Promise<Document[]>

    getTasksByDateRange(userId: string, dateRange: {startDateRange: string, endDateRange: string}): Promise<Document[]>

    deleteTask(taskId: string): Promise<Document | null>;
    
    getAllUserTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Document[]>>;
    
    getTaskById(taskId: string): Promise<Document | null>;

    saveTask(task: ICreateTaskRequestDTO): Promise<Document>;

    getCompletedTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Document[]>>;

    getTodaysTask(userId: string, pagination: ITasksPagination): Promise<IPage<Document[]>>;

    getNextTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Document[]>>;

    completeTaskById(taskId: string): Promise<UpdateWriteOpResult>;

    completeManyTasksById(tasksId: string[]): Promise<UpdateWriteOpResult>;

    updateTask(taskId: string, taskUpdate: ITaskUpdateRequestDTO): Promise<Document | null>;
}