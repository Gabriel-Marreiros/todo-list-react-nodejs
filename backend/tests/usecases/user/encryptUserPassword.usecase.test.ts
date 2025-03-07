import bcrypt from 'bcrypt';
import { EncryptUserPasswordUseCase } from '../../../src/usecases/user/encryptUserPassword.usecase';

jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));

const mockBcryptHash = bcrypt.hash as jest.Mock;

const encryptUserPasswordUseCase = new EncryptUserPasswordUseCase();

describe('EncryptUserPasswordUseCase', () => {
    describe('execute', () => {
        test('should return an encrypted password', async () => {
            const password = 'testPassword';
            const encryptedPassword = 'encryptedPassword';
            
            mockBcryptHash.mockResolvedValueOnce(encryptedPassword);

            const result = await encryptUserPasswordUseCase.execute(password);

            expect(mockBcryptHash).toHaveBeenCalledWith(password, 12);
            expect(result).toBe(encryptedPassword);
        });

        test('should handle errors from bcrypt.hash', async () => {
            const password = 'testPassword';
            const error = new Error('bcrypt error');
            
            mockBcryptHash.mockRejectedValueOnce(error);

            await expect(encryptUserPasswordUseCase.execute(password)).rejects.toThrow(error);
        });
    });
});
