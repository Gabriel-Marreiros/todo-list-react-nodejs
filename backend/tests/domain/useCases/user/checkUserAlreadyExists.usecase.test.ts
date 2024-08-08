import { CheckUserAlreadyExistsUseCase } from '../../../../src/domain/useCases/user/checkUserAlreadyExists.usecase';
import { mockUserRepository } from '../../../mocks/repositories/user.repository.mock.test';

const checkUserAlreadyExistsUseCase = new CheckUserAlreadyExistsUseCase(mockUserRepository);

describe('CheckUserAlreadyExistsUseCase', () => {
    describe('execute', () => {
        test('should return true if the user exists', async () => {
            const email = 'test@example.com';
            const mockUser = { email };
            
            mockUserRepository.getUserByEmail.mockResolvedValueOnce(mockUser);

            const result = await checkUserAlreadyExistsUseCase.execute(email);

            expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
            expect(result).toBe(true);
        });

        test('should return false if the user does not exist', async () => {
            const email = 'test@example.com';
            
            mockUserRepository.getUserByEmail.mockResolvedValueOnce(null);

            const result = await checkUserAlreadyExistsUseCase.execute(email);

            expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(email);
            expect(result).toBe(false);
        });

        test('should handle errors from the repository', async () => {
            const email = 'test@example.com';
            const error = new Error('Database error');
            
            mockUserRepository.getUserByEmail.mockRejectedValueOnce(error);

            await expect(checkUserAlreadyExistsUseCase.execute(email)).rejects.toThrow(error);
        });
    });
});
