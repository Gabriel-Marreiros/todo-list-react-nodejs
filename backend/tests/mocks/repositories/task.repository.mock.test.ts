import { ITaskRepository } from "../../../src/domain/repositories/task/ITaskRepository";

export const mockTaskRepository: jest.Mocked<ITaskRepository> = {
    getAllUserTasks: jest.fn(),
    getTaskById: jest.fn(),
    saveTask: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
    getNextTasks: jest.fn(),
    getTodaysTask: jest.fn(),
    getCompletedTasks: jest.fn(),
    completeTaskById: jest.fn(),
    completeManyTasksById: jest.fn(),
};