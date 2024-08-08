import { ITaskService } from "../../../src/application/services/task/ITaskService";

export const mockTaskService: jest.Mocked<ITaskService> = {
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