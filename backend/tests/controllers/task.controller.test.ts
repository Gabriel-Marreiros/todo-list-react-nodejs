import { NextFunction, Request, Response } from 'express';
import { TaskController } from '../../src/controllers/task.controller';
import { Task } from '../../src/entities/task.entity';
import { taskServiceMock } from '../mocks/services/task.service.mock';
import { taskMock } from '../mocks/entities/task.mock';

const taskController = new TaskController(taskServiceMock);

describe('TaskController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: Partial<NextFunction>;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn();
    });

    describe('getAllUserTasks', () => {
        test('Deve retornar todas as tarefas do usuário', async () => {
            const userId = 'testUserId';
            const userTasks: Task[] = [taskMock];

            taskServiceMock.getAllUserTasks.mockResolvedValueOnce(userTasks);
            mockRequest.params = { userId };

            const handler = taskController.getAllUserTasks();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.getAllUserTasks).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledWith(userTasks);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em getAllUserTasks com falha', async () => {
            const error = new Error('Failed to get tasks');
            taskServiceMock.getAllUserTasks.mockRejectedValueOnce(error);

            const handler = taskController.getAllUserTasks();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getTaskById', () => {
        test('Deve retornar tarefa por id', async () => {
            const taskId = 'testTaskId';
            const task: Task = taskMock;

            taskServiceMock.getTaskById.mockResolvedValueOnce(task);
            mockRequest.params = { taskId };

            const handler = taskController.getTaskById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.getTaskById).toHaveBeenCalledWith(taskId);
            expect(mockResponse.json).toHaveBeenCalledWith(task);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em getTaskById com falha', async () => {
            const error = new Error('Failed to get task');
            taskServiceMock.getTaskById.mockRejectedValueOnce(error);

            const handler = taskController.getTaskById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('createTask', () => {
        test('Deve criar uma tarefa', async () => {
            const userId = 'testUserId';
            const taskData = { name: 'New Task', user: userId };
            const savedTask: Task = taskMock;

            taskServiceMock.saveTask.mockResolvedValueOnce(savedTask);
            mockRequest.header = jest.fn().mockReturnValue(userId);
            mockRequest.body = taskData;

            const handler = taskController.createTask();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.saveTask).toHaveBeenCalledWith(taskData);
            expect(mockResponse.json).toHaveBeenCalledWith(savedTask);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em createTask com falha', async () => {
            const error = new Error('Failed to create task');
            taskServiceMock.saveTask.mockRejectedValueOnce(error);

            const handler = taskController.createTask();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('updateTask', () => {
        test('Deve atualizar uma tarefa', async () => {
            const taskId = '1';
            const taskUpdate = { name: 'Updated Task' };
            const updatedTask: Task = taskMock;

            taskServiceMock.updateTask.mockResolvedValueOnce(updatedTask);
            mockRequest.params = { taskId };
            mockRequest.body = taskUpdate;

            const handler = taskController.updateTask();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.updateTask).toHaveBeenCalledWith(taskId, taskUpdate);
            expect(mockResponse.json).toHaveBeenCalledWith(updatedTask);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em falha no updateTask', async () => {
            const error = new Error('Failed to update task');
            taskServiceMock.updateTask.mockRejectedValueOnce(error);

            const handler = taskController.updateTask();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteTask', () => {
        test('Deve excluir uma tarefa', async () => {
            const taskId = 'TestId';
            const deletedTask: Task = taskMock;

            taskServiceMock.deleteTask.mockResolvedValueOnce(deletedTask);
            mockRequest.params = { taskId };

            const handler = taskController.deleteTask();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(taskId);
            expect(mockResponse.json).toHaveBeenCalledWith(deletedTask);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em deleteTask com falha', async () => {
            const error = new Error('Failed to delete task');
            taskServiceMock.deleteTask.mockRejectedValueOnce(error);

            const handler = taskController.deleteTask();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getNextTasks', () => {
        test('Deve retornar próximas tarefas', async () => {
            const userId = 'TestUserId';
            const nextTasks: Task[] = [taskMock];

            taskServiceMock.getNextTasks.mockResolvedValueOnce(nextTasks);
            mockRequest.header = jest.fn().mockReturnValue(userId);

            const handler = taskController.getNextTasks();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.getNextTasks).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledWith(nextTasks);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em getNextTasks com falha', async () => {
            const error = new Error('Failed to get next tasks');
            taskServiceMock.getNextTasks.mockRejectedValueOnce(error);

            const handler = taskController.getNextTasks();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getTodaysTask', () => {
        test('deveria retornar as tarefas de hoje', async () => {
            const userId = 'testUserId';
            const todaysTasks: Task[] = [taskMock];

            taskServiceMock.getTodaysTask.mockResolvedValueOnce(todaysTasks);
            mockRequest.header = jest.fn().mockReturnValue(userId);

            const handler = taskController.getTodaysTask();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.getTodaysTask).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledWith(todaysTasks);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em getTodaysTask com falha', async () => {
            const error = new Error('Failed to get today\'s tasks');
            taskServiceMock.getTodaysTask.mockRejectedValueOnce(error);

            const handler = taskController.getTodaysTask();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getCompletedTasks', () => {
        test('Deve retornar tarefas concluídas', async () => {
            const userId = 'testUserId';
            const completedTasks: Task[] = [taskMock];

            taskServiceMock.getCompletedTasks.mockResolvedValueOnce(completedTasks);
            mockRequest.header = jest.fn().mockReturnValue(userId);

            const handler = taskController.getCompletedTasks();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.getCompletedTasks).toHaveBeenCalledWith(userId);
            expect(mockResponse.json).toHaveBeenCalledWith(completedTasks);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em getCompletedTasks com falha', async () => {
            const error = new Error('Failed to get completed tasks');
            taskServiceMock.getCompletedTasks.mockRejectedValueOnce(error);

            const handler = taskController.getCompletedTasks();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('completeTaskById', () => {
        test('Deve completar uma tarefa por id', async () => {
            const taskId = '1';
            const completedTask: Task = taskMock;

            taskServiceMock.completeTaskById.mockResolvedValueOnce(completedTask);
            mockRequest.body = { taskId };

            const handler = taskController.completeTaskById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.completeTaskById).toHaveBeenCalledWith(taskId);
            expect(mockResponse.json).toHaveBeenCalledWith(completedTask);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em completeTaskById com falha', async () => {
            const error = new Error('Failed to complete task');
            taskServiceMock.completeTaskById.mockRejectedValueOnce(error);

            const handler = taskController.completeTaskById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('completeManyTasksById', () => {
        test('Deve completar múltiplas tarefas por IDs', async () => {
            const tasksId = ['TestId1', 'TestId2'];
            const completedTasks: Task[] = [taskMock];

            taskServiceMock.completeManyTasksById.mockResolvedValueOnce(completedTasks);
            mockRequest.body = tasksId;

            const handler = taskController.completeManyTasksById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(taskServiceMock.completeManyTasksById).toHaveBeenCalledWith(tasksId);
            expect(mockResponse.json).toHaveBeenCalledWith(completedTasks);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        test('Deve chamar next com erro em completeManyTasksById com falha', async () => {
            const error = new Error('Failed to complete tasks');
            taskServiceMock.completeManyTasksById.mockRejectedValueOnce(error);

            const handler = taskController.completeManyTasksById();
            await handler(mockRequest as Request, mockResponse as Response, mockNext as NextFunction);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});
