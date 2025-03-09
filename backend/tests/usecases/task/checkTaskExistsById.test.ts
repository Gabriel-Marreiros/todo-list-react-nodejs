import { CheckTaskExistsByIdUseCase } from '../../../src/usecases/task/checkTaskExistsById';
import { taskRepositoryMock } from '../../mocks/repositories/task.repository.mock';

const checkTaskExistsByIdUseCaseInstance = new CheckTaskExistsByIdUseCase(taskRepositoryMock);

describe('CheckTaskExistsByIdUseCase', () => {
    describe('execute', () => {
        test('should return true if the task exists', async () => {
            const taskId = '123';
            const mockTask = { _id: taskId }
            
            taskRepositoryMock.getTaskById.mockResolvedValueOnce(mockTask);

            const result = await checkTaskExistsByIdUseCaseInstance.execute(taskId);

            expect(taskRepositoryMock.getTaskById).toHaveBeenCalledWith(taskId);
            expect(result).toBe(true);
        });

        test('should return false if the task does not exist', async () => {
            const taskId = '123';
            
            taskRepositoryMock.getTaskById.mockResolvedValueOnce(null);

            const result = await checkTaskExistsByIdUseCaseInstance.execute(taskId);

            expect(taskRepositoryMock.getTaskById).toHaveBeenCalledWith(taskId);
            expect(result).toBe(false);
        });

        test('should handle errors from the repository', async () => {
            const taskId = '123';
            const error = new Error('Database error');
            
            taskRepositoryMock.getTaskById.mockRejectedValueOnce(error);

            await expect(checkTaskExistsByIdUseCaseInstance.execute(taskId)).rejects.toThrow(error);
        });
    });
});
