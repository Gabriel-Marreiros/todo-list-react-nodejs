import bcrypt from 'bcrypt';
import { CheckPasswordIsCorrectUseCase } from '../../../src/usecases/user/checkPasswordIsCorrect.usecase';

jest.mock('bcrypt', () => ({
    compare: jest.fn(),
}));

const mockBcryptCompare = bcrypt.compare as jest.Mock;

const checkPasswordIsCorrectUseCase = new CheckPasswordIsCorrectUseCase();

describe('CheckPasswordIsCorrectUseCase', () => {
    describe('execute', () => {
        test('should return true if the password is correct', async () => {
            const inputPassword = 'inputPassword';
            const userPassword = 'hashedUserPassword';
            
            mockBcryptCompare.mockResolvedValueOnce(true);

            const result = await checkPasswordIsCorrectUseCase.execute({ inputPassword, userPassword });

            expect(mockBcryptCompare).toHaveBeenCalledWith(inputPassword, userPassword);
            expect(result).toBe(true);
        });

        test('should return false if the password is incorrect', async () => {
            const inputPassword = 'inputPassword';
            const userPassword = 'hashedUserPassword';
            
            mockBcryptCompare.mockResolvedValueOnce(false);

            const result = await checkPasswordIsCorrectUseCase.execute({ inputPassword, userPassword });

            expect(mockBcryptCompare).toHaveBeenCalledWith(inputPassword, userPassword);
            expect(result).toBe(false);
        });

        test('should handle errors from bcrypt.compare', async () => {
            const inputPassword = 'inputPassword';
            const userPassword = 'hashedUserPassword';
            const error = new Error('bcrypt error');
            
            mockBcryptCompare.mockRejectedValueOnce(error);

            await expect(checkPasswordIsCorrectUseCase.execute({ inputPassword, userPassword })).rejects.toThrow(error);
        });
    });
});
