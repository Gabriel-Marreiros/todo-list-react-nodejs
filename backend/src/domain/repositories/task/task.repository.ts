import { Document, UpdateWriteOpResult } from "mongoose";
import { ITaskRepository } from "./ITaskRepository";
import TaskModel from "../../../infrastructure/database/mongodb/schemas/task.schema";
import { ICreateTaskRequestDTO } from "../../../application/dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../../../application/dto/task/ITaskUpdateRequestDTO";

class TaskRepository implements ITaskRepository {

    constructor() { }

    public async getTodaysTask(userId: string): Promise<Document[]> {
        const timezone = -3;
        const currentDate = new Date();

        const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
        startOfDay.setHours(startOfDay.getHours() + timezone);

        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
        endOfDay.setHours(endOfDay.getHours() + timezone);

        const response = await TaskModel.find()
            .where({
                user: userId,
                startDateTime: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            })
            .sort({
                startDateTime: 1,
            })
            .populate("category")
            .exec();

        return response;
    }

    public async getNextTasks(userId: string): Promise<Document[]> {
        const timezone = -3;
        const currentDate = new Date();

        const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59, 999);
        endOfDay.setHours(endOfDay.getHours() + timezone);

        const response = await TaskModel.find()
            .where({
                user: userId,
                startDateTime: { 
                    $gt: endOfDay 
                }
            })
            .sort({
                startDateTime: 1,
            })
            .populate("category")
            .exec();

        return response;
    }

    public async getCompletedTasks(userId: string): Promise<Document[]> {
        const response = await TaskModel.find()
            .where({
                user: userId,
                completed: true
            })
            .sort({
                startDateTime: 1,
            })
            .populate("category")
            .exec();

        return response;
    }

    public async updateTask(taskId: string, taskUpdate: ITaskUpdateRequestDTO): Promise<Document | null> {
        const response = await TaskModel.findByIdAndUpdate(taskId, taskUpdate);

        return response;
    }

    public async deleteTask(taskId: string): Promise<Document | null> {
        const response = await TaskModel.findByIdAndDelete(taskId);

        return response;
    }

    public async getAllUserTasks(userId: string): Promise<Document[]> {
        const response = await TaskModel.find()
            .where({ 
                user: userId 
            })
            .sort({
                completed: 1,
                startDateTime: 1
            })
            .populate("category")
            .exec();

        return response;
    }

    public async getTaskById(taskId: string): Promise<Document | null> {
        const response = await TaskModel.findById(taskId);

        return response;
    }

    public async saveTask(task: ICreateTaskRequestDTO): Promise<Document> {
        const response = await TaskModel.create(task);

        return response;
    }

    public async completeTaskById(taskId: string): Promise<UpdateWriteOpResult> {
        const response = await TaskModel.updateOne(
            { _id: taskId },
            { $set: { completed: true } }
        );

        return response;
    }

    public async completeManyTasksById(tasksId: string[]): Promise<UpdateWriteOpResult> {
        const response = await TaskModel.updateMany(
            { _id: { $in: tasksId } },
            { $set: { completed: true } }
        );

        return response;
    }
}

export const taskRepository = new TaskRepository();