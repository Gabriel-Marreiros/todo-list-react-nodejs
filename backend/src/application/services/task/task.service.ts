
import { Task } from "../../../domain/entities/task.entity";
import { TaskNotExistsError } from "../../../domain/errors/task/TaskNotExistsError";
import { ITaskRepository } from "../../../domain/repositories/task/ITaskRepository";
import { taskRepository } from "../../../domain/repositories/task/task.repository";
import { checkTaskExistsByIdUseCase, CheckTaskExistsByIdUseCase } from "../../../domain/useCases/task/checkTaskExistsById";
import { ICreateTaskRequestDTO } from "../../dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../../dto/task/ITaskUpdateRequestDTO";
import { ITaskService } from "./ITaskService";

export class TaskService implements ITaskService {

    constructor(
        private taskRepository: ITaskRepository,
        private checkTaskExistsByIdUseCase: CheckTaskExistsByIdUseCase
    ){}

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

    public async getAllUserTasks(userId: string): Promise<Task[]> {
        const response = await this.taskRepository.getAllUserTasks(userId);

        const userTasks: Task[] = response.map((t) => Task.with(t.toJSON()));

        return userTasks;
    }

    public async saveTask(taskData: ICreateTaskRequestDTO): Promise<Task> {
        const response = await this.taskRepository.saveTask(taskData);

        const task: Task = Task.with(response.toJSON());

        return task;
    }

    public async getNextTasks(userId: string): Promise<Task[]> {
        const response = await this.taskRepository.getNextTasks(userId);

        const tasks: Task[] = response.map((task) => Task.with(task.toJSON()));

        return tasks;
    }

    public async getTodaysTask(userId: string): Promise<Task[]> {
        const response = await this.taskRepository.getTodaysTask(userId);

        const tasks: Task[] = response.map((task) => Task.with(task.toJSON()));

        return tasks;
    }

    public async getCompletedTasks(userId: string): Promise<Task[]> {
        const response = await this.taskRepository.getCompletedTasks(userId);

        const tasks: Task[] = response.map((task) => Task.with(task.toJSON()));

        return tasks;
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

export default new TaskService(
    taskRepository,
    checkTaskExistsByIdUseCase
);