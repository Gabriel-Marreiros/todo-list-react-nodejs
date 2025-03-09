import { TaskServiceImpl } from './../services/task/task.service';
import { KafkaServiceImpl } from '../services/kafka/kafka.service';
import { NextFunction, Request, RequestHandler, Response } from "express";
import { Task } from "../entities/task.entity";
import { ICreateTaskRequestDTO } from "../dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../dto/task/ITaskUpdateRequestDTO";
import { ITaskService } from "../services/task/ITaskService";
import { IPage } from '../interfaces/IPage';
import dayjs from "dayjs";
import { ITasksSummaryDTO } from "../dto/task/ITasksSummaryDTO";
import { IKafkaService } from '../services/kafka/IKafkaService';


export class TaskController {

    constructor(
        private taskService: ITaskService,
        private kafkaService: IKafkaService
    ) { }

    public getLateTasks(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const page: number = Number(request.query.page) || 1;
                const size: number = Number(request.query.size) || 5;

                const lateTasksPage: IPage<Task[]> = await this.taskService.getLateTasks(userId, { page, size });

                response.json(lateTasksPage).status(200)
            }
            catch (error) {
                next(error);
            }
        }
    }

    public getTasksSummary(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const tasksSummary: ITasksSummaryDTO = await this.taskService.getTasksSummary(userId);

                response.json(tasksSummary).status(200)
            }
            catch (error) {
                next(error);
            }
        }
    }

    public getTasksByDate(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const dateFilter = String(request.query.date);

                const tasks: Task[] = await this.taskService.getTasksByDate(userId, dateFilter);

                response.json(tasks).status(200)
            }
            catch (error) {
                next(error);
            }
        }
    }

    public getTasksByDateRange(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const startDateRange = String(request.query.startDateRange);
                const endDateRange = String(request.query.endDateRange);

                const tasks: Task[] = await this.taskService.getTasksByDateRange(userId, { startDateRange, endDateRange });

                response.json(tasks).status(200)
            }
            catch (error) {
                next(error);
            }
        }
    }

    public getAllUserTasks(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const page: number = Number(request.query.page) || 1;
                const size: number = Number(request.query.size) || 5;

                const userTasks: IPage<Task[]> = await this.taskService.getAllUserTasks(userId, { page, size });

                response.json(userTasks).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public getTaskById(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;
                const taskId: string = request.params.taskId;

                const task: Task = await this.taskService.getTaskById(taskId);

                response.json(task).status(200);
            }
            catch (error) {
                next(error)
            }
        }

    }

    public createTask(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;
                const taskData: ICreateTaskRequestDTO = request.body;

                taskData.user = userId;

                const savedTask: Task = await this.taskService.saveTask(taskData);

                const kafkaMessage = {
                    userEmail: savedTask.user.email,
                    userName: savedTask.user.name,
                    taskTitle: savedTask.title,
                    startDateTime: savedTask.startDateTime.toISOString()
                };
                
                this.kafkaService.produceMessage("task-notification-topic", kafkaMessage);
                
                response.json(savedTask).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public updateTask(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const taskId: string = request.params.taskId;
                const taskUpdate: ITaskUpdateRequestDTO = request.body;

                const updatedTask: Task = await this.taskService.updateTask(taskId, taskUpdate);

                response.json(updatedTask).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public deleteTask(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const taskId: string = request.params.taskId;

                const deletedTask: Task = await this.taskService.deleteTask(taskId);

                response.json(deletedTask).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public getNextTasks(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const page: number = Number(request.query.page) || 1;
                const size: number = Number(request.query.size) || 5;

                const nextTasks: IPage<Task[]> = await this.taskService.getNextTasks(userId, { page, size });

                response.json(nextTasks).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public getTodaysTask(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const page: number = Number(request.query.page) || 1;
                const size: number = Number(request.query.size) || 5;

                const todaysTasks: IPage<Task[]> = await this.taskService.getTodaysTask(userId, { page, size });

                response.json(todaysTasks).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public getCompletedTasks(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.header("user-id")!;

                const page: number = Number(request.query.page) || 1;
                const size: number = Number(request.query.size) || 5;

                const completedTasks: IPage<Task[]> = await this.taskService.getCompletedTasks(userId, { page, size });

                response.json(completedTasks).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public completeTaskById(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const taskId: string = request.body.taskId;

                const completedTask: Task[] = await this.taskService.completeTaskById(taskId);

                response.json(completedTask).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

    public completeManyTasksById(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const tasksId: string[] = request.body;

                const completedTasks: Task[] = await this.taskService.completeManyTasksById(tasksId);

                response.json(completedTasks).status(200);
            }
            catch (error) {
                next(error)
            }
        }
    }

}

export default new TaskController(
    TaskServiceImpl,
    KafkaServiceImpl
);