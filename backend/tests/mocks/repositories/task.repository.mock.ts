import { ITaskRepository } from "../../../src/repositories/task/ITaskRepository";

export const taskRepositoryMock: jest.Mocked<ITaskRepository> = {
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
    getLateTasks: jest.fn(),
    getTasksByDate:  jest.fn(),
    getTasksByDateRange: jest.fn(),
    getTasksSummary: jest.fn()
};