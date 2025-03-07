import { IPage } from '../../interfaces/IPage';
import { ITasksPagination } from '../../interfaces/ITasksPagination';
import { Task } from "../../entities/task.entity";
import { ICreateTaskRequestDTO } from "../../dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../../dto/task/ITaskUpdateRequestDTO";
import { ITasksSummaryDTO } from '../../dto/task/ITasksSummaryDTO';


export interface ITaskService {
    getTasksSummary(userId: string): Promise<ITasksSummaryDTO>
    
    getTasksByDate(userId: string, date: string): Promise<Task[]>
    
    getTasksByDateRange(userId: string, dateRange: {startDateRange: string, endDateRange: string}): Promise<Task[]>

    updateTask(taskId: string, taskUpdate: ITaskUpdateRequestDTO): Promise<Task>;

    deleteTask(taskId: string): Promise<Task>;

    getAllUserTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>>;

    getTaskById(taskId: string): Promise<Task>;

    saveTask(task: ICreateTaskRequestDTO): Promise<Task>;

    getNextTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>>;

    getTodaysTask(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>>;
    
    getCompletedTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>>;
    
    completeTaskById(taskId: string): Promise<any>;

    completeManyTasksById(tasksId: string[]): Promise<any>;

    getLateTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>>;
}