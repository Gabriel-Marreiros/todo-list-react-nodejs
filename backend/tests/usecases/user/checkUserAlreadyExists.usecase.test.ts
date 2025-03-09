import { CheckUserAlreadyExistsUseCase } from '../../../src/usecases/user/checkUserAlreadyExists.usecase';
import { userRepositoryMock } from '../../mocks/repositories/user.repository.mock';

const checkUserAlreadyExistsUseCase = new CheckUserAlreadyExistsUseCase(userRepositoryMock);

describe('CheckUserAlreadyExistsUseCase', () => {
    describe('execute', () => {
        test('should return true if the user exists', async () => {
            const email = 'test@example.com';
            const mockUser = { email };
            
            userRepositoryMock.getUserByEmail.mockResolvedValueOnce(mockUser);

            const result = await checkUserAlreadyExistsUseCase.execute(email);

            expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(email);
            expect(result).toBe(true);
        });

        test('should return false if the user does not exist', async () => {
            const email = 'test@example.com';
            
            userRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

            const result = await checkUserAlreadyExistsUseCase.execute(email);

            expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(email);
            expect(result).toBe(false);
        });

        test('should handle errors from the repository', async () => {
            const email = 'test@example.com';
            const error = new Error('Database error');
            
            userRepositoryMock.getUserByEmail.mockRejectedValueOnce(error);

            await expect(checkUserAlreadyExistsUseCase.execute(email)).rejects.toThrow(error);
        });
    });
});
