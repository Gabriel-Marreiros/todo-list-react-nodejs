import { NextFunction, Request, RequestHandler, Response } from "express";
import { ITaskService } from "../services/task/ITaskService";
import taskService from "../services/task/task.service";
import { Task } from "../../domain/entities/task.entity";
import { ICreateTaskRequestDTO } from "../dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../dto/task/ITaskUpdateRequestDTO";


export class TaskController {

    constructor(
        private taskService: ITaskService
    ) { }

    public getAllUserTasks(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const userId: string = request.params.userId;

                const userTasks: Task[] = await this.taskService.getAllUserTasks(userId);

                response.json(userTasks).status(200).send();
            }
            catch (error) {
                next(error)
            }
        }
    }

    public getTaskById(): RequestHandler {
        return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
            try {
                const taskId: string = request.params.taskId;

                const task: Task = await taskService.getTaskById(taskId);

                response.json(task).status(200).send();
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

                response.json(savedTask).status(200).send();
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

                response.json(updatedTask).status(200).send();
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

                response.json(deletedTask).status(200).send();
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

                const nextTasks: Task[] = await this.taskService.getNextTasks(userId);

                response.json(nextTasks).status(200).send();
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

                const todaysTasks: Task[] = await this.taskService.getTodaysTask(userId);

                response.json(todaysTasks).status(200).send();
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

                const completedTasks: Task[] = await this.taskService.getCompletedTasks(userId);

                response.json(completedTasks).status(200).send();
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

                response.json(completedTask).status(200).send();
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

                response.json(completedTasks).status(200).send();
            }
            catch (error) {
                next(error)
            }
        }
    }

}

export default new TaskController(taskService);