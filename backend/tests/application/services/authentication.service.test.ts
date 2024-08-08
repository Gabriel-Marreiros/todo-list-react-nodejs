import { AuthenticationService } from "../../../src/application/services/authentication/authentication.service";
import { GenerateTokenUseCase } from "../../../src/domain/useCases/jwt/generateToken.usecase";
import { ValidateTokenUseCase } from "../../../src/domain/useCases/jwt/validateToken.usecase";
import { CheckPasswordIsCorrectUseCase } from "../../../src/domain/useCases/user/checkPasswordIsCorrect.usecase";
import { mockUserRepository } from "../../mocks/repositories/user.repository.mock.test";
import { mockUserService } from "../../mocks/services/user.controller.mock.test";

const mockGenerateTokenUseCase: jest.Mocked<GenerateTokenUseCase> = {
    execute: jest.fn(),
};

const mockValidateTokenUseCase: jest.Mocked<ValidateTokenUseCase> = {
    execute: jest.fn(),
};

const mockCheckPasswordIsCorrectUseCase: jest.Mocked<CheckPasswordIsCorrectUseCase> = {
    execute: jest.fn(),
};

const authenticationService = new AuthenticationService(
    mockUserRepository,
    mockGenerateTokenUseCase,
    mockCheckPasswordIsCorrectUseCase,
    mockUserService,
    mockValidateTokenUseCase
);

describe('AuthenticationService', () => {
    describe('registerUser', () => {
        test('should register a user and return a token', async () => {
            const userData: User = { id: '1', name: 'Test User', email: 'test@example.com', password: 'password' };
            const createdUser: User = { ...userData };
            const token = 'fakeToken';

            mockUserService.createUser.mockResolvedValueOnce(createdUser);
            mockGenerateTokenUseCase.execute.mockReturnValueOnce(token);

            const result: IRegisterUserResponseDTO = await authenticationService.registerUser(userData);

            expect(mockUserService.createUser).toHaveBeenCalledWith(userData);
            expect(mockGenerateTokenUseCase.execute).toHaveBeenCalledWith(createdUser);
            expect(result).toEqual({ token, createdUser });
        });

        test('should throw an error if user creation fails', async () => {
            const userData: User = { id: '1', name: 'Test User', email: 'test@example.com', password: 'password' };

            mockUserService.createUser.mockRejectedValueOnce(new Error('Failed to create user'));

            await expect(authenticationService.registerUser(userData)).rejects.toThrow('Failed to create user');
        });
    });

    describe('login', () => {
        test('should return a token for valid credentials', async () => {
            const loginData: ILoginRequestDTO = { email: 'test@example.com', password: 'password' };
            const user = new User({ id: '1', email: loginData.email, password: 'hashedPassword' });
            const token = 'fakeToken';

            mockUserRepository.getUserByEmail.mockResolvedValueOnce(user);
            mockCheckPasswordIsCorrectUseCase.execute.mockResolvedValueOnce(true);
            mockGenerateTokenUseCase.execute.mockReturnValueOnce(token);

            const result = await authenticationService.login(loginData);

            expect(mockUserRepository.getUserByEmail).toHaveBeenCalledWith(loginData.email);
            expect(mockCheckPasswordIsCorrectUseCase.execute).toHaveBeenCalledWith({
                inputPassword: loginData.password,
                userPassword: user.password
            });
            expect(mockGenerateTokenUseCase.execute).toHaveBeenCalledWith(user);
            expect(result).toEqual({ userToken: token });
        });

        test('should throw an error for invalid credentials', async () => {
            const loginData: ILoginRequestDTO = { email: 'test@example.com', password: 'wrongPassword' };

            mockUserRepository.getUserByEmail.mockResolvedValueOnce(null);

            await expect(authenticationService.login(loginData)).rejects.toThrow('Usuário ou senha incorretos.');
        });

        test('should throw an error if password is incorrect', async () => {
            const loginData: ILoginRequestDTO = { email: 'test@example.com', password: 'wrongPassword' };
            const user = new User({ id: '1', email: loginData.email, password: 'hashedPassword' });

            mockUserRepository.getUserByEmail.mockResolvedValueOnce(user);
            mockCheckPasswordIsCorrectUseCase.execute.mockResolvedValueOnce(false);

            await expect(authenticationService.login(loginData)).rejects.toThrow('Usuário ou senha incorretos.');
        });
    });

    describe('authenticateToken', () => {
        test('should return true for a valid token', async () => {
            const token = 'Bearer validToken';
            const tokenPayload = { userId: '1' };

            mockValidateTokenUseCase.execute.mockResolvedValueOnce(tokenPayload);

            const result = await authenticationService.authenticateToken(token);

            expect(mockValidateTokenUseCase.execute).toHaveBeenCalledWith('validToken');
            expect(result).toBe(true);
        });

        test('should return false for an invalid token', async () => {
            const token = 'Bearer invalidToken';

            mockValidateTokenUseCase.execute.mockResolvedValueOnce(null);

            const result = await authenticationService.authenticateToken(token);

            expect(mockValidateTokenUseCase.execute).toHaveBeenCalledWith('invalidToken');
            expect(result).toBe(false);
        });

        test('should return false if token validation throws an error', async () => {
            const token = 'Bearer tokenThatFailsValidation';

            mockValidateTokenUseCase.execute.mockRejectedValueOnce(new Error('Validation error'));

            const result = await authenticationService.authenticateToken(token);

            expect(result).toBe(false);
        });
    });
});
