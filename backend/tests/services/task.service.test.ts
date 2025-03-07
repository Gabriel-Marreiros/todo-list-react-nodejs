import { ICreateTaskRequestDTO } from "../../src/dto/task/ICreateTaskRequestDTO";
import { ITaskUpdateRequestDTO } from "../../src/dto/task/ITaskUpdateRequestDTO";
import { TaskService } from "../../src/services/task/task.service";
import { Task } from "../../src/entities/task.entity";
import { TaskNotExistsError } from "../../src/errors/task/TaskNotExistsError";
import { CheckTaskExistsByIdUseCase } from "../../src/usecases/task/checkTaskExistsById";
import { taskRepositoryMock } from "../mocks/repositories/task.repository.mock";


const mockCheckTaskExistsById: jest.Mocked<CheckTaskExistsByIdUseCase> = {
    execute: jest.fn(),
};

const taskService = new TaskService(
    mockTaskRepository,
    mockCheckTaskExistsById
);

describe('TaskService', () => {
    describe('updateTask', () => {
        test('should update a task if it exists', async () => {
            const taskId = '1';
            const taskUpdate: ITaskUpdateRequestDTO = { title: 'Updated Task' };
            const updatedTask = { toJSON: () => ({ id: taskId, title: 'Updated Task' }) };

            mockCheckTaskExistsById.execute.mockResolvedValueOnce(true);
            mockTaskRepository.updateTask.mockResolvedValueOnce(updatedTask);

            const result = await taskService.updateTask(taskId, taskUpdate);

            expect(mockCheckTaskExistsById.execute).toHaveBeenCalledWith(taskId);
            expect(mockTaskRepository.updateTask).toHaveBeenCalledWith(taskId, taskUpdate);
            expect(result).toEqual(Task.with(updatedTask.toJSON()));
        });

        test('should throw TaskNotExistsError if the task does not exist', async () => {
            const taskId = '1';
            const taskUpdate: ITaskUpdateRequestDTO = { title: 'Updated Task' };

            mockCheckTaskExistsById.execute.mockResolvedValueOnce(false);

            await expect(taskService.updateTask(taskId, taskUpdate)).rejects.toThrow(TaskNotExistsError);
        });
    });

    describe('deleteTask', () => {
        test('should delete a task if it exists', async () => {
            const taskId = '1';
            const deletedTask = { toJSON: () => ({ id: taskId, title: 'Task to Delete' }) };

            mockCheckTaskExistsById.execute.mockResolvedValueOnce(true);
            mockTaskRepository.deleteTask.mockResolvedValueOnce(deletedTask);

            const result = await taskService.deleteTask(taskId);

            expect(mockCheckTaskExistsById.execute).toHaveBeenCalledWith(taskId);
            expect(mockTaskRepository.deleteTask).toHaveBeenCalledWith(taskId);
            expect(result).toEqual(Task.with(deletedTask.toJSON()));
        });

        test('should throw TaskNotExistsError if the task does not exist', async () => {
            const taskId = '1';

            mockCheckTaskExistsById.execute.mockResolvedValueOnce(false);

            await expect(taskService.deleteTask(taskId)).rejects.toThrow(TaskNotExistsError);
        });
    });

    describe('getTaskById', () => {
        test('should return a task if it exists', async () => {
            const taskId = '1';
            const task = { toJSON: () => ({ id: taskId, title: 'Existing Task' }) };

            mockTaskRepository.getTaskById.mockResolvedValueOnce(task);

            const result = await taskService.getTaskById(taskId);

            expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(taskId);
            expect(result).toEqual(Task.with(task.toJSON()));
        });

        test('should throw TaskNotExistsError if the task does not exist', async () => {
            const taskId = '1';

            mockTaskRepository.getTaskById.mockResolvedValueOnce(null);

            await expect(taskService.getTaskById(taskId)).rejects.toThrow(TaskNotExistsError);
        });
    });

    describe('getAllUserTasks', () => {
        test('should return all tasks for a user', async () => {
            const userId = 'user1';
            const tasks = [{ toJSON: () => ({ id: '1', title: 'Task 1' }) }];

            mockTaskRepository.getAllUserTasks.mockResolvedValueOnce(tasks);

            const result = await taskService.getAllUserTasks(userId);

            expect(mockTaskRepository.getAllUserTasks).toHaveBeenCalledWith(userId);
            expect(result).toEqual(tasks.map(t => Task.with(t.toJSON())));
        });
    });

    describe('saveTask', () => {
        test('should save a task', async () => {
            const taskData: ICreateTaskRequestDTO = { title: 'New Task' };
            const savedTask = { toJSON: () => ({ id: '1', title: 'New Task' }) };

            mockTaskRepository.saveTask.mockResolvedValueOnce(savedTask);

            const result = await taskService.saveTask(taskData);

            expect(mockTaskRepository.saveTask).toHaveBeenCalledWith(taskData);
            expect(result).toEqual(Task.with(savedTask.toJSON()));
        });
    });

    describe('getNextTasks', () => {
        test('should return next tasks for a user', async () => {
            const userId = 'user1';
            const tasks = [{ toJSON: () => ({ id: '1', title: 'Next Task' }) }];

            mockTaskRepository.getNextTasks.mockResolvedValueOnce(tasks);

            const result = await taskService.getNextTasks(userId);

            expect(mockTaskRepository.getNextTasks).toHaveBeenCalledWith(userId);
            expect(result).toEqual(tasks.map(task => Task.with(task.toJSON())));
        });
    });

    describe('getTodaysTask', () => {
        test('should return today\'s tasks for a user', async () => {
            const userId = 'user1';
            const tasks = [{ toJSON: () => ({ id: '1', title: 'Today\'s Task' }) }];

            mockTaskRepository.getTodaysTask.mockResolvedValueOnce(tasks);

            const result = await taskService.getTodaysTask(userId);

            expect(mockTaskRepository.getTodaysTask).toHaveBeenCalledWith(userId);
            expect(result).toEqual(tasks.map(task => Task.with(task.toJSON())));
        });
    });

    describe('getCompletedTasks', () => {
        test('should return completed tasks for a user', async () => {
            const userId = 'user1';
            const tasks = [{ toJSON: () => ({ id: '1', title: 'Completed Task' }) }];

            mockTaskRepository.getCompletedTasks.mockResolvedValueOnce(tasks);

            const result = await taskService.getCompletedTasks(userId);

            expect(mockTaskRepository.getCompletedTasks).toHaveBeenCalledWith(userId);
            expect(result).toEqual(tasks.map(task => Task.with(task.toJSON())));
        });
    });

    describe('completeTaskById', () => {
        test('should complete a task by id', async () => {
            const taskId = '1';
            const completedTask = { toJSON: () => ({ id: taskId, title: 'Completed Task' }) };

            mockTaskRepository.completeTaskById.mockResolvedValueOnce(completedTask);

            const result = await taskService.completeTaskById(taskId);

            expect(mockTaskRepository.completeTaskById).toHaveBeenCalledWith(taskId);
            expect(result).toEqual(completedTask);
        });
    });

    describe('completeManyTasksById', () => {
        test('should complete many tasks by ids', async () => {
            const taskIds = ['1', '2'];
            const completedTasks = [{ toJSON: () => ({ id: '1', title: 'Completed Task 1' }) }, { toJSON: () => ({ id: '2', title: 'Completed Task 2' }) }];

            mockTaskRepository.completeManyTasksById.mockResolvedValueOnce(completedTasks);

            const result = await taskService.completeManyTasksById(taskIds);

            expect(mockTaskRepository.completeManyTasksById).toHaveBeenCalledWith(taskIds);
            expect(result).toEqual(completedTasks);
        });
    });
});
