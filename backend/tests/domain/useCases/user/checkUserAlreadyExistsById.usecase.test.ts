import { CheckUserAlreadyExistsByIdUseCase } from "../../../../src/domain/useCases/user/checkUserAlreadyExistsById.usecase";
import { mockUserRepository } from "../../../mocks/repositories/user.repository.mock.test";



const checkUserAlreadyExistsByIdUseCase = new CheckUserAlreadyExistsByIdUseCase(mockUserRepository);

describe('CheckUserAlreadyExistsByIdUseCase', () => {
    describe('execute', () => {
        test('should return true if the user exists', async () => {
            const userId = 'user123';
            const mockUser = { _id: userId };
            
            mockUserRepository.getUserById.mockResolvedValueOnce(mockUser);

            const result = await checkUserAlreadyExistsByIdUseCase.execute(userId);

            expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
            expect(result).toBe(true);
        });

        test('should return false if the user does not exist', async () => {
            const userId = 'user123';
            
            mockUserRepository.getUserById.mockResolvedValueOnce(null);

            const result = await checkUserAlreadyExistsByIdUseCase.execute(userId);

            expect(mockUserRepository.getUserById).toHaveBeenCalledWith(userId);
            expect(result).toBe(false);
        });

        test('should handle errors from the repository', async () => {
            const userId = 'user123';
            const error = new Error('Database error');
            
            mockUserRepository.getUserById.mockRejectedValueOnce(error);

            await expect(checkUserAlreadyExistsByIdUseCase.execute(userId)).rejects.toThrow(error);
        });
    });
});
