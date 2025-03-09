import { Document, UpdateWriteOpResult } from "mongoose";
import { ITaskRepository } from "./ITaskRepository";
import TaskModel from "../../database/mongodb/schemas/task.schema";
import { ICreateTaskRequestDTO } from "../../dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../../dto/task/ITaskUpdateRequestDTO";
import { ITasksPagination } from "../../interfaces/ITasksPagination";
import { IPage } from "../../interfaces/IPage";
import dayjs from "dayjs";
import { ITasksSummaryDTO } from "../../dto/task/ITasksSummaryDTO";

class TaskRepository implements ITaskRepository {

    constructor() { }

    public async getLateTasks(userId: string, { page, size }: ITasksPagination): Promise<IPage<Document[]>> {
        const now: string = dayjs().toISOString();

        const query = {
            user: userId,
            startDateTime: {
                $lt: now
            },
            completed: false
        }

        const lateTasksPromise = TaskModel.find()
            .where(query)
            .skip((page - 1) * size)
            .limit(size)
            .sort({
                completed: 1,
                startDateTime: "asc"
            })
            .populate("category")
            .exec();

        const totalElementsPromise = TaskModel.countDocuments().where(query);

        const [tasks, totalElements] = await Promise.all([lateTasksPromise, totalElementsPromise]);

        const totalPages: number = Math.ceil(totalElements / size);

        const lateTasksPage: IPage<Document[]> = {
            totalElements,
            totalPages,
            data: tasks
        }

        return lateTasksPage;
    }

    public async getTasksByDate(userId: string, date: string): Promise<Document[]> {
        const startDate: string = dayjs(date).hour(0).minute(0).second(0).toISOString();
        const endDate: string = dayjs(date).hour(23).minute(59).second(59).toISOString();

        const query = {
            user: userId,
            startDateTime: {
                $gte: startDate,
                $lte: endDate
            }
        }

        const tasks = await TaskModel.find()
            .where(query)
            .sort({
                startDateTime: "asc",
            })
            .populate("category")
            .exec();

        return tasks;
    }

    public async getTasksByDateRange(userId: string, { startDateRange, endDateRange }: { startDateRange: string, endDateRange: string }): Promise<Document[]> {
        const query = {
            user: userId,
            startDateTime: {
                $gte: startDateRange
            },
            endDateTime: {
                $lte: endDateRange
            }
        }
        
        const tasks = await TaskModel.find()
            .where(query)
            .sort({
                startDateTime: "asc",
            })
            .populate("category")
            .exec();

        return tasks;
    }

    public async getTodaysTask(userId: string, { page, size }: ITasksPagination): Promise<IPage<Document[]>> {
        const startOfDay = dayjs().hour(0).minute(0).second(0).toISOString();
        const endOfDay: string = dayjs().hour(23).minute(59).second(59).toISOString();

        const query = {
            user: userId,
            startDateTime: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        }

        const todayTasksPromise = TaskModel.find()
            .where(query)
            .skip((page - 1) * size)
            .limit(size)
            .sort({
                startDateTime: "asc",
            })
            .populate("category")
            .exec();

        // Obtem a quantidade total de documentos
        const totalElementsPromise = TaskModel.countDocuments().where(query);

        const [todayTasks, totalElements] = await Promise.all([todayTasksPromise, totalElementsPromise]);

        // Calcula a quantidade total de páginas
        const totalPages: number = Math.ceil(totalElements / size);

        const todayTasksPage: IPage<Document[]> = {
            totalElements,
            totalPages,
            data: todayTasks
        }

        return todayTasksPage;
    }

    public async getNextTasks(userId: string, { page, size }: ITasksPagination): Promise<IPage<Document[]>> {

        const startOfNextDay = dayjs().add(1, "day").hour(0).minute(0).second(0).toISOString();

        const query = {
            user: userId,
            startDateTime: {
                $gte: startOfNextDay
            }
        }

        const nextTasksPromise = await TaskModel.find()
            .where(query)
            .sort({
                startDateTime: "asc",
            })
            .skip((page - 1) * size)
            .limit(size)
            .populate("category")
            .exec();

        const totalElementsPromise = TaskModel.countDocuments().where(query);

        const [nextTasks, totalElements] = await Promise.all([nextTasksPromise, totalElementsPromise]);

        const totalPages: number = Math.ceil(totalElements / size);

        const nextTasksPage: IPage<Document[]> = {
            totalElements,
            totalPages,
            data: nextTasks
        }

        return nextTasksPage;
    }

    public async getCompletedTasks(userId: string, { page, size }: ITasksPagination): Promise<IPage<Document[]>> {
        const query = {
            user: userId,
            completed: true
        };

        const completedTasksPromise = TaskModel.find()
            .where(query)
            .skip((page - 1) * size)
            .limit(size)
            .sort({
                startDateTime: "asc",
            })
            .populate("category")
            .exec();

        const totalElementsPromise = TaskModel.countDocuments().where(query);

        const [completedTasks, totalElements] = await Promise.all([completedTasksPromise, totalElementsPromise]);

        const totalPages: number = Math.ceil(totalElements / size);

        const completedTasksPage: IPage<Document[]> = {
            totalElements,
            totalPages,
            data: completedTasks
        }

        return completedTasksPage;
    }

    public async updateTask(taskId: string, taskUpdate: ITaskUpdateRequestDTO): Promise<Document | null> {
        const response = await TaskModel.findByIdAndUpdate(taskId, taskUpdate);

        return response;
    }

    public async deleteTask(taskId: string): Promise<Document | null> {
        const response = await TaskModel.findByIdAndDelete(taskId);

        return response;
    }

    public async getAllUserTasks(userId: string, { page, size }: ITasksPagination): Promise<IPage<Document[]>> {
        const query = {
            user: userId
        }

        const tasksPromise = TaskModel.find()
            .where(query)
            .skip((page - 1) * size)
            .limit(size)
            .sort({
                completed: 1,
                startDateTime: "asc"
            })
            .populate("category")
            .exec();

        const totalElementsPromise = TaskModel.countDocuments().where(query);

        const [tasks, totalElements] = await Promise.all([tasksPromise, totalElementsPromise]);

        const totalPages: number = Math.ceil(totalElements / size);

        const tasksPage: IPage<Document[]> = {
            totalElements,
            totalPages,
            data: tasks
        }

        return tasksPage;
    }

    public async getTaskById(taskId: string): Promise<Document | null> {
        const response = await TaskModel.findById(taskId);

        return response;
    }

    public async saveTask(task: ICreateTaskRequestDTO): Promise<Document> {
        const response = await TaskModel.create(task);

        const populatedResponse = await response.populate('user');

        return populatedResponse;
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

    public async getTasksSummary(userId: string): Promise<ITasksSummaryDTO> {
        const startOfDay = dayjs().hour(0).minute(0).second(0).toISOString();
        const endOfDay = dayjs().hour(23).minute(59).second(59).toISOString();

        const todaysTasksQuery = {
            user: userId,
            startDateTime: {
                $gte: startOfDay,
                $lte: endOfDay
            },
            completed: false
        }

        const todaysTasksCountPromise = TaskModel.find()
            .where(todaysTasksQuery)
            .countDocuments();

        const startOfNextDay = dayjs().add(1, "day").hour(0).minute(0).second(0).toISOString();
        const endOfNextDay = dayjs().add(1, "day").hour(23).minute(59).second(59).toISOString();

        const tomorrowTasksQuery = {
            user: userId,
            startDateTime: {
                $gte: startOfNextDay,
                $lte: endOfNextDay
            },
            completed: false
        }

        const tomorrowTasksCountPromise = TaskModel.find()
            .where(tomorrowTasksQuery)
            .countDocuments();

        const now: string = dayjs().toISOString();
        const overdueTasksQuery = {
            user: userId,
            startDateTime: {
                $lt: now
            },
            completed: false
        }

        const overdueTasksCountPromise = TaskModel.find()
        .where(overdueTasksQuery)
        .countDocuments();

        const [todaysTasksCount, tomorrowTasksCount, overdueTasksCount] = await Promise.all([todaysTasksCountPromise, tomorrowTasksCountPromise, overdueTasksCountPromise]);

        const tasksSummary: ITasksSummaryDTO = {
            todayTasks: todaysTasksCount,
            tomorrowTasks: tomorrowTasksCount,
            overdueTasks: overdueTasksCount
        }

        return tasksSummary;
    }
}

export const taskRepository = new TaskRepository();