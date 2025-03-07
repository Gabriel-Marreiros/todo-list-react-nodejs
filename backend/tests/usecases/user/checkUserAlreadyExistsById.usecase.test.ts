import { CheckUserAlreadyExistsByIdUseCase } from "../../../src/usecases/user/checkUserAlreadyExistsById.usecase";
import { userRepositoryMock } from "../../mocks/repositories/user.repository.mock";



const checkUserAlreadyExistsByIdUseCase = new CheckUserAlreadyExistsByIdUseCase(userRepositoryMock);

describe('CheckUserAlreadyExistsByIdUseCase', () => {
    describe('execute', () => {
        test('should return true if the user exists', async () => {
            const userId = 'user123';
            const mockUser = { _id: userId };
            
            userRepositoryMock.getUserById.mockResolvedValueOnce(mockUser);

            const result = await checkUserAlreadyExistsByIdUseCase.execute(userId);

            expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(userId);
            expect(result).toBe(true);
        });

        test('should return false if the user does not exist', async () => {
            const userId = 'user123';
            
            userRepositoryMock.getUserById.mockResolvedValueOnce(null);

            const result = await checkUserAlreadyExistsByIdUseCase.execute(userId);

            expect(userRepositoryMock.getUserById).toHaveBeenCalledWith(userId);
            expect(result).toBe(false);
        });

        test('should handle errors from the repository', async () => {
            const userId = 'user123';
            const error = new Error('Database error');
            
            userRepositoryMock.getUserById.mockRejectedValueOnce(error);

            await expect(checkUserAlreadyExistsByIdUseCase.execute(userId)).rejects.toThrow(error);
        });
    });
});
