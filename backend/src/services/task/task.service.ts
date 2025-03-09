import { IPage } from '../../interfaces/IPage';

import { Task } from "../../entities/task.entity";
import { TaskNotExistsError } from "../../errors/task/TaskNotExistsError";
import { ITaskRepository } from "../../repositories/task/ITaskRepository";
import { taskRepository } from "../../repositories/task/task.repository";
import { checkTaskExistsByIdUseCase, CheckTaskExistsByIdUseCase } from "../../usecases/task/checkTaskExistsById";
import { ICreateTaskRequestDTO } from "../../dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../../dto/task/ITaskUpdateRequestDTO";
import { ITasksPagination } from "../../interfaces/ITasksPagination";
import { ITaskService } from "./ITaskService";
import { Document } from 'mongoose';
import dayjs from 'dayjs';
import { InvalidDateRangeError } from '../../errors/task/InvalidDateRangeError';
import { InvalidDateError } from '../../errors/task/InvalidDateError';
import { ITasksSummaryDTO } from '../../dto/task/ITasksSummaryDTO';

export class TaskService implements ITaskService {
    
    constructor(
        private taskRepository: ITaskRepository,
        private checkTaskExistsByIdUseCase: CheckTaskExistsByIdUseCase
    ){}

    public async getLateTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>> {
        const repositoryResponse = await this.taskRepository.getLateTasks(userId, pagination);

        const lateTasks: Task[] = repositoryResponse.data.map((t) => Task.with(t.toJSON()));

        const lateTasksPage: IPage<Task[]> = {
            ...repositoryResponse,
            data: lateTasks
        }

        return lateTasksPage;
    }
    
    public async getTasksSummary(userId: string): Promise<ITasksSummaryDTO> {
        const tasksSummary: ITasksSummaryDTO = await this.taskRepository.getTasksSummary(userId);

        return  tasksSummary;
    }

    public async getTasksByDate(userId: string, date: string): Promise<Task[]> {
        const dateIsValid = dayjs(date).isValid();

        if(!dateIsValid){
            throw new InvalidDateError(
                "Data inválida",
                "A data fornecida é inválida",
                404
            );
        }

        const response: Document[] = await this.taskRepository.getTasksByDate(userId, date);

        const tasks: Task[] = response.map((task) => Task.with(task.toJSON()));

        return tasks;
    }

    public async getTasksByDateRange(userId: string, {startDateRange, endDateRange}: { startDateRange: string; endDateRange: string; }): Promise<Task[]> {
        const endDateIsBeforeStartDate = dayjs(endDateRange).isBefore(startDateRange);

        if(endDateIsBeforeStartDate){
            throw new InvalidDateRangeError(
                "Intervalo de datas inválido",
                "O intervalo de datas é inválido",
                404
            );
        }

        const formattedStartDateRange: string = dayjs(startDateRange).hour(0).minute(0).toISOString();
        const formattedEndDateRange: string = dayjs(endDateRange).hour(23).minute(59).toISOString();

        const response: Document[] = await this.taskRepository.getTasksByDateRange(userId, {startDateRange: formattedStartDateRange, endDateRange: formattedEndDateRange});

        const tasks: Task[] = response.map((task) => Task.with(task.toJSON()));

        return tasks;
    }

    public async updateTask(taskId: string, taskUpdate: ITaskUpdateRequestDTO): Promise<Task> {
        const taskExists: boolean = await this.checkTaskExistsByIdUseCase.execute(taskId);

        if(!taskExists){
            throw new TaskNotExistsError(
                "Tarefa não existe",
                "A tarefa solicitada não existe",
                404
            );
        }

        const response = await this.taskRepository.updateTask(taskId, taskUpdate);

        const task: Task = Task.with(response!.toJSON());

        return task;
    }

    public async deleteTask(taskId: string): Promise<Task> {
        const taskExists: boolean = await this.checkTaskExistsByIdUseCase.execute(taskId);

        if(!taskExists){
            throw new TaskNotExistsError(
                "Tarefa não existe",
                "A tarefa solicitada não existe",
                404
            );
        }

        const response = await this.taskRepository.deleteTask(taskId);

        const task: Task = Task.with(response!.toJSON());

        return task;
    }
    
    public async getTaskById(taskId: string): Promise<Task> {
        const response = await this.taskRepository.getTaskById(taskId);

        if(!response){
            throw new TaskNotExistsError(
                "Tarefa não existe",
                "A tarefa solicitada não existe",
                404
            );
        }

        const task: Task = Task.with(response.toJSON());

        return task;
    };

    public async getAllUserTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>> {
        const repositoryResponse = await this.taskRepository.getAllUserTasks(userId, pagination);

        const userTasks: Task[] = repositoryResponse.data.map((t) => Task.with(t.toJSON()));

        const userTasksPage: IPage<Task[]> = {
            ...repositoryResponse,
            data: userTasks
        }

        return userTasksPage;
    }

    public async saveTask(taskData: ICreateTaskRequestDTO): Promise<Task> {
        const response = await this.taskRepository.saveTask(taskData);

        const task: Task = Task.with(response.toJSON());

        return task;
    }

    public async getNextTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>> {
        const repositoryResponse = await this.taskRepository.getNextTasks(userId, pagination);

        const nextTasks = repositoryResponse.data.map((task) => Task.with(task.toJSON()));

        const nextTasksPage: IPage<Task[]> = {
            ...repositoryResponse,
            data: nextTasks
        } 

        return nextTasksPage;
    }

    public async getTodaysTask(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>> {
        const repositoryResponse: IPage<Document[]> = await this.taskRepository.getTodaysTask(userId, pagination);

        const todayTasks = repositoryResponse.data.map((task) => Task.with(task.toJSON()));
        
        const todayTasksPage: IPage<Task[]> = {
            ...repositoryResponse, 
            data: todayTasks
        };

        return todayTasksPage;
    }

    public async getCompletedTasks(userId: string, pagination: ITasksPagination): Promise<IPage<Task[]>> {
        const repositoryResponse = await this.taskRepository.getCompletedTasks(userId, pagination);

        const completedTasks: Task[] = repositoryResponse.data.map((task) => Task.with(task.toJSON()));

        const completedTasksPage: IPage<Task[]> = {
            ...repositoryResponse, 
            data: completedTasks
        };

        return completedTasksPage;
    }

    public async completeTaskById(taskId: string): Promise<any> {
        const response = await this.taskRepository.completeTaskById(taskId);

        return response;
    }

    public async completeManyTasksById(tasksId: string[]): Promise<any> {
        const response = await this.taskRepository.completeManyTasksById(tasksId);

        return response;
    }
}

export const TaskServiceImpl = new TaskService(
    taskRepository,
    checkTaskExistsByIdUseCase
);