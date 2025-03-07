import { UserService } from "../../src/services/user/user.service";
import { User } from "../../src/entities/user.entity";
import { UserAlreadyExistsError } from "../../src/errors/user/UserAlreadyExistsError";
import { UserNotExistsError } from "../../src/errors/user/UserNotExistsError";
import { CheckUserAlreadyExistsUseCase } from "../../src/usecases/user/checkUserAlreadyExists.usecase";
import { CheckUserAlreadyExistsByIdUseCase } from "../../src/usecases/user/checkUserAlreadyExistsById.usecase";
import { EncryptUserPasswordUseCase } from "../../src/usecases/user/encryptUserPassword.usecase";
import { userRepositoryMock } from "../mocks/repositories/user.repository.mock";


const mockCheckUserAlreadyExistsUseCase: jest.Mocked<CheckUserAlreadyExistsUseCase> = {
    execute: jest.fn(),
};

const mockCheckUserAlreadyExistsByIdUseCase: jest.Mocked<CheckUserAlreadyExistsByIdUseCase> = {
    execute: jest.fn(),
};

const mockEncryptUserPasswordUseCase: jest.Mocked<EncryptUserPasswordUseCase> = {
    execute: jest.fn(),
};

const userService = new UserService(
    userRepositoryMock,
    mockCheckUserAlreadyExistsUseCase,
    mockCheckUserAlreadyExistsByIdUseCase,
    mockEncryptUserPasswordUseCase
);

describe('UserService', () => {
    describe('createUser', () => {
        test('should create a user if it does not already exist', async () => {
            const user = User({ email: 'test@example.com', password: 'password123' });
            const encryptedPassword = 'encryptedPassword';
            const createdUser = { toJSON: () => ({ email: user.email, password: encryptedPassword }) };

            mockCheckUserAlreadyExistsUseCase.execute.mockResolvedValueOnce(false);
            mockEncryptUserPasswordUseCase.execute.mockResolvedValueOnce(encryptedPassword);
            mockUserRepository.createUser.mockResolvedValueOnce(createdUser);

            const result = await userService.createUser(user);

            expect(mockCheckUserAlreadyExistsUseCase.execute).toHaveBeenCalledWith(user.email);
            expect(mockEncryptUserPasswordUseCase.execute).toHaveBeenCalledWith(user.password);
            expect(mockUserRepository.createUser).toHaveBeenCalledWith(user);
            expect(result).toEqual(User.with(createdUser.toJSON()));
        });

        test('should throw UserAlreadyExistsError if the user already exists', async () => {
            const user = User({ email: 'test@example.com', password: 'password123' });

            mockCheckUserAlreadyExistsUseCase.execute.mockResolvedValueOnce(true);

            await expect(userService.createUser(user)).rejects.toThrow(UserAlreadyExistsError);
        });
    });

    describe('updateUser', () => {
        test('should update a user if it exists', async () => {
            const userId = 'userId';
            const userUpdate = { email: 'updated@example.com' };
            const updatedUser = { toJSON: () => ({ id: userId, email: 'updated@example.com' }) };

            mockCheckUserAlreadyExistsByIdUseCase.execute.mockResolvedValueOnce(true);
            mockUserRepository.updateUser.mockResolvedValueOnce(updatedUser);

            const result = await userService.updateUser(userId, userUpdate);

            expect(mockCheckUserAlreadyExistsByIdUseCase.execute).toHaveBeenCalledWith(userId);
            expect(mockUserRepository.updateUser).toHaveBeenCalledWith(userId, userUpdate);
            expect(result).toEqual(User.with(updatedUser.toJSON()));
        });

        test('should throw UserNotExistsError if the user does not exist', async () => {
            const userId = 'userId';
            const userUpdate = { email: 'updated@example.com' };

            mockCheckUserAlreadyExistsByIdUseCase.execute.mockResolvedValueOnce(false);

            await expect(userService.updateUser(userId, userUpdate)).rejects.toThrow(UserNotExistsError);
        });
    });

    describe('deleteUser', () => {
        test('should delete a user if it exists', async () => {
            const userId = 'userId';
            const deletedUser = { toJSON: () => ({ id: userId }) };

            mockCheckUserAlreadyExistsByIdUseCase.execute.mockResolvedValueOnce(true);
            mockUserRepository.deleteUser.mockResolvedValueOnce(deletedUser);

            const result = await userService.deleteUser(userId);

            expect(mockCheckUserAlreadyExistsByIdUseCase.execute).toHaveBeenCalledWith(userId);
            expect(mockUserRepository.deleteUser).toHaveBeenCalledWith(userId);
            expect(result).toEqual(User.with(deletedUser.toJSON()));
        });

        test('should throw UserNotExistsError if the user does not exist', async () => {
            const userId = 'userId';

            mockCheckUserAlreadyExistsByIdUseCase.execute.mockResolvedValueOnce(false);

            await expect(userService.deleteUser(userId)).rejects.toThrow(UserNotExistsError);
        });
    });
});
