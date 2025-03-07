import { ITaskService } from "../../../src/services/task/ITaskService";

export const taskServiceMock: jest.Mocked<ITaskService> = {
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
    getTasksByDate: jest.fn(),
    getTasksByDateRange: jest.fn(),
    getTasksSummary: jest.fn()
};