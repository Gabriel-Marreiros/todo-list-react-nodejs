import { CheckTaskExistsByIdUseCase } from '../../../../src/domain/useCases/task/checkTaskExistsById';
import { mockTaskRepository } from '../../../mocks/repositories/task.repository.mock.test';

const checkTaskExistsByIdUseCaseInstance = new CheckTaskExistsByIdUseCase(mockTaskRepository);

describe('CheckTaskExistsByIdUseCase', () => {
    describe('execute', () => {
        test('should return true if the task exists', async () => {
            const taskId = '123';
            const mockTask = { _id: taskId }
            
            mockTaskRepository.getTaskById.mockResolvedValueOnce(mockTask);

            const result = await checkTaskExistsByIdUseCaseInstance.execute(taskId);

            expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(taskId);
            expect(result).toBe(true);
        });

        test('should return false if the task does not exist', async () => {
            const taskId = '123';
            
            mockTaskRepository.getTaskById.mockResolvedValueOnce(null);

            const result = await checkTaskExistsByIdUseCaseInstance.execute(taskId);

            expect(mockTaskRepository.getTaskById).toHaveBeenCalledWith(taskId);
            expect(result).toBe(false);
        });

        test('should handle errors from the repository', async () => {
            const taskId = '123';
            const error = new Error('Database error');
            
            mockTaskRepository.getTaskById.mockRejectedValueOnce(error);

            await expect(checkTaskExistsByIdUseCaseInstance.execute(taskId)).rejects.toThrow(error);
        });
    });
});
